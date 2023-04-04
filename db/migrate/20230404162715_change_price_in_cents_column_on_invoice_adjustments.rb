class ChangePriceInCentsColumnOnInvoiceAdjustments < ActiveRecord::Migration[7.0]
  def change
    change_column :invoice_adjustments, :price_in_cents, :integer, default: 0
  end
end
