class AddTimestampsToLedgerEntries < ActiveRecord::Migration[7.0]
  def change
    add_timestamps :ledger_entries, null: true

    previous = 1.week.ago
    LedgerEntries.update_all(created_at: previous, updated_at: previous)

    change_column_null :ledger_entries, :created_at, false
    change_column_null :ledger_entries, :updated_at, false
  end
end
