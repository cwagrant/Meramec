class AddTimestampsToLedgerEntries < ActiveRecord::Migration[7.0]
  def change
    add_timestamps :ledger_entries, null: true
  end
end
