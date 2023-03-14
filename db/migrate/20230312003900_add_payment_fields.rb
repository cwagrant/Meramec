class AddPaymentFields < ActiveRecord::Migration[7.0]
  def change
    change_table :rental_agreements do |t|
      t.integer :cost_in_cents, default: 0
    end

    change_table :rental_agreement_payments do |t|
      t.integer :amount_in_cents, default: 0
      t.text :note, default: ''
    end
  end
end
