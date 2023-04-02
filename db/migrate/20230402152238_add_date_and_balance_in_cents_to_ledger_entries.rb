class AddDateAndBalanceInCentsToLedgerEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :ledger_entries, :date, :date
    add_column :ledger_entries, :balance_in_cents, :integer, default: 0
    add_column :account_adjustments, :date, :date
  end
end
