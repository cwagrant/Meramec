class RemoveUnusedFieldsFromTables < ActiveRecord::Migration[7.0]
  def change
    remove_column :rental_agreement_payments, :paid_months, :integer
    remove_column :rental_agreement_payments, :paid_until, :date
    remove_column :payments, :amount_in_cents, :integer
  end
end
