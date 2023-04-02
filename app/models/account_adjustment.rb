class AccountAdjustment < ApplicationRecord
  # In retrospect a RentalAgreement would've been better called an Account. Too late for that though.
  belongs_to :rental_agreement
  belongs_to :source, polymorphic: true
  has_one :ledger_entry, as: :source, dependent: :destroy

  attr_accessor :price

  before_save :set_price_in_cents
  after_save :create_or_update_transaction

  def key
    id
  end

  private

  def create_or_update_transaction
    date_of_transaction = date || source.try(:date)
    price_change = type_of == "discount" ? price_in_cents : (price_in_cents * -1)

    entry = LedgerEntry.where(source: self).first_or_initialize(
      date: date_of_transaction,
      source: self,
      rental_agreement: rental_agreement,
      amount_in_cents: price_change
    )

    if entry.new_record?
      entry.save
    else
      entry.update(amount_in_cents: price_change)
    end
  end


  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
