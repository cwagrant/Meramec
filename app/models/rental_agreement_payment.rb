class RentalAgreementPayment < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :payment

  has_one :ledger_entry, as: :source, dependent: :destroy
  has_many :account_adjustments, as: :source, dependent: :destroy

  before_validation :set_amount_in_cents
  after_save :create_or_update_transaction

  accepts_nested_attributes_for :account_adjustments, allow_destroy: true, reject_if: :empty_adjustment?
  attr_reader :amount

  delegate :date, to: :payment

  def amount=(value)
    attribute_will_change!(:amount_in_cents) if value.present?
    @amount = value
  end

  private

  def empty_adjustment?(adjustment_attributes)
    return true if adjustment_attributes.blank?

    # In the event someone were to clear out the price fields before deleting we still want to make sure
    # we can delete it properly.
    return false if adjustment_attributes['_destroy'].present? && adjustment_attributes['id'].present?

    return true if adjustment_attributes['price'].blank? && (
      adjustment_attributes['price_in_cents'].blank? || 
        adjustment_attributes['price_in_cents'].zero?
    )

    false
  end

  def create_or_update_transaction
    entry = LedgerEntry.where(source: self).first_or_initialize(
      date: payment.date,
      source: self,
      rental_agreement: rental_agreement,
      amount_in_cents: amount_in_cents
    )

    if entry.new_record?
      entry.save!
    else
      entry.update(amount_in_cents: amount_in_cents)
    end
  end

  def set_amount_in_cents
    return if amount.blank?

    self.amount_in_cents = (amount.to_f * 100)
  end
end
