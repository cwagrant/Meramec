class RemoveDeadTables < ActiveRecord::Migration[7.0]
  def change
    drop_table :ledger_entries
    drop_table :account_adjustments
    drop_table :rental_agreement_payments
    drop_table :rental_agreement_terms
    drop_table :rental_agreement_term_values
    drop_table :terms
  end
end
