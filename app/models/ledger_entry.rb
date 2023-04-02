class LedgerEntry < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :source, polymorphic: true

  before_create :set_ledger_balance
  after_update :update_running_balance
  after_destroy :update_running_balance

  default_scope { order(date: :asc, id: :asc) }

  def set_ledger_balance
    last_entry = LedgerEntry.where(rental_agreement: rental_agreement).last
    last_balance = last_entry&.balance_in_cents || 0

    self.balance_in_cents = last_balance + amount_in_cents
  end

  def update_running_balance
    return unless saved_change_to_amount_in_cents?

    return if LedgerEntry.where(rental_agreement: rental_agreement).last == self

    RunningBalanceUpdate.new(rental_agreement).call
  end
end
