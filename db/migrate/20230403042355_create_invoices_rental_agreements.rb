class CreateInvoicesRentalAgreements < ActiveRecord::Migration[7.0]
  def change
    create_table :invoice_items do |t|
      t.references :invoice, null: false, foreign_key: true
      t.references :item, polymorphic: true
      t.integer :item_count, null: false, default: 1

      t.timestamps
    end
  end
end
