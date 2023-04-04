class AddPaymentToInvoices < ActiveRecord::Migration[7.0]
  def change
    add_reference :invoices, :payment, null: true, foreign_key: true
    add_column :payments, :price_in_cents, :integer, null: false, default: 0
    add_column :payments, :payment_type, :string
    add_column :payments, :check_number, :integer
    
  end
end
