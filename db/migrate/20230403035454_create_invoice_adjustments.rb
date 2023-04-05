class CreateInvoiceAdjustments < ActiveRecord::Migration[7.0]
  def change
    create_table :invoice_adjustments do |t|
      t.references :invoice, null: false, foreign_key: true
      t.string :type_of
      t.string :reason
      t.string :reason_description
      t.integer :price_in_cents, default: 0

      t.timestamps
    end
  end
end
