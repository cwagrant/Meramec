class RunningBalanceUpdate
  attr_accessor :rental_agreement, :error

  def initialize(rental_agreement)
    @rental_agreement = rental_agreement
  end

  def call
    update_running_balances

    self
  rescue StandardError => e
    error = e
  end

  def success?
    !error
  end

  private

  def update_running_balances
    ledgers = LedgerEntry.where(rental_agreement: rental_agreement).order(date: :asc, id: :asc)

    ledgers.reduce(0) do |balance, ledger|
      new_balance = balance + ledger.amount_in_cents

      ledger.update(balance_in_cents: new_balance)

      new_balance
    end
  end
end
