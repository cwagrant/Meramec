class AddTransactionsTable < ActiveRecord::Migration[7.0]
  def change
    if column_exists?(:rental_agreements, :cost_in_cents)
      change_table :rental_agreements do |t|
        t.remove :cost_in_cents
      end
    end

    create_table :ledger_entries do |t|
      t.references :rental_agreement, foreign_key: { to_table: :rental_agreements }
      t.references :source, polymorphic: true
      t.integer :amount_in_cents, default: 0
    end

    if !column_exists?(:rental_agreements, :next_due_date)
      change_table :rental_agreements do |t|
        t.date :next_due_date
      end
    end
  end
end
