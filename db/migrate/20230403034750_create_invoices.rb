class CreateInvoices < ActiveRecord::Migration[7.0]
  def change
    create_table :invoices do |t|
      t.references :customer, null: false, foreign_key: true
      t.string :state, null: false, default: :draft
      t.date :date
      t.integer :subtotal_in_cents, default: 0
      t.integer :total_in_cents, default: 0
      t.boolean :paid, default: false

      t.timestamps
    end
  end
end
