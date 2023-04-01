class AddTimestampsToLedgerEntries < ActiveRecord::Migration[7.0]
  def change
    add_column :ledger_entries, :created_at, :datetime, null: false
    add_column :ledger_entries, :updated_at, :datetime, null: false
  end
end
