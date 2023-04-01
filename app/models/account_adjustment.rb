class AccountAdjustment < ApplicationRecord
  # In retrospect a RentalAgreement would've been better called an Account. Too late for that though.
  belongs_to :rental_agreement
  has_one :ledger_entry, as: :source, dependent: :destroy

  attr_accessor :price

  before_save :set_price_in_cents
  after_save :create_or_update_transaction

  def key
    id
  end

  private

  def create_or_update_transaction
    entry = LedgerEntry.where(source: self).first_or_create(
      source: self,
      rental_agreement: rental_agreement
    )

    if type_of == "discount"
      entry.update(amount_in_cents: price_in_cents)
    else
      entry.update(amount_in_cents: price_in_cents * -1)
    end
  end


  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
