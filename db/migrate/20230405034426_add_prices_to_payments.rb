class AddPricesToPayments < ActiveRecord::Migration[7.0]
  def change
    rename_column :payments, :price_in_cents, :paid_in_cents
    add_column :payments, :discounts_in_cents, :integer, default: 0
    add_column :payments, :fees_in_cents, :integer, default: 0
    add_column :payments, :subtotal_in_cents, :integer, default: 0
    add_column :payments, :total_in_cents, :integer, default: 0
  end
end
