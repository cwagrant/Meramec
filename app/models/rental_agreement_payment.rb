class RentalAgreementPayment < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :payment

  has_one :ledger_entry, as: :source, dependent: :destroy
  has_many :account_adjustments, as: :source, dependent: :destroy

  before_validation :set_amount_in_cents
  after_save :create_or_update_transaction

  accepts_nested_attributes_for :account_adjustments, allow_destroy: true, reject_if: :empty_adjustment?
  attr_reader :amount

  def amount=(value)
    attribute_will_change!(:amount_in_cents) if value.present?
    @amount = value
  end

  private

  def empty_adjustment?(adjustment_attributes)
    puts adjustment_attributes, 'cwag'
    return false if adjustment_attributes['id'].present?
    return true if adjustment_attributes['price'].blank?
  end

  def create_or_update_transaction
    rat = LedgerEntry.where(source: self).first_or_create(
      source: self,
      rental_agreement: rental_agreement
    )

    rat.update(amount_in_cents: amount_in_cents)
  end

  def set_amount_in_cents
    return if amount.blank?


    self.amount_in_cents = (amount.to_f * 100)
  end
end
