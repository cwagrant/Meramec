class CreateAccountAdjustments < ActiveRecord::Migration[7.0]
  def change
    create_table :account_adjustments do |t|
      t.integer :rental_agreement_id
      t.references :source, polymorphic: true
      t.string :type_of
      t.string :reason
      t.string :reason_description
      t.integer :price_in_cents, default: 0

      t.timestamps
    end
  end
end
