class RentalAgreementPayment < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :payment

  has_one :ledger_entry

  before_validation :set_amount_in_cents
  after_save :create_or_update_transaction

  attr_accessor :amount

  private

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
