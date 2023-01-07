class InitialTableSetup < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.text :address_1
      t.text :address_2
      t.string :city
      t.string :state_code
      t.string :zipcode
      t.string :country_code
      t.timestamps
    end

    create_table :properties do |t|
      t.string :name
      t.references :address, foreign_key:{ to_table: :addresses }
      t.timestamps
    end

    create_table :units do |t|
      t.string :name
      t.integer :type_of
      t.integer :price_in_cents
      t.references :property, foreign_key: { to_table: :properties }
      t.references :address, foreign_key: { to_table: :properties }
      t.timestamps
    end

    create_table :customers do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :gate_code
      t.references :address, foreign_key: { to_table: :addresses }
      t.timestamps
    end

    create_table :rental_agreements do |t|
      t.references :unit, foreign_key: { to_table: :units }
      t.references :customer, foreign_key: { to_table: :customer }
      t.integer :price_in_cents
    end

    create_table :terms do |t|
      t.string :name
      t.text :description
      t.integer :term_type
      t.timestamps
    end

    create_table :rental_agreement_terms do |t|
      t.references :rental_agreement, foreign_key: { to_table: :rental_agreements }
      t.references :terms, foreign_key: { to_table: :terms }
      t.date :starts_at
      t.date :ends_at
      t.timestamps
    end

    # Planning to make it so that a rental agreement can have various terms and terms can themselves
    # contain multiple values. These values will allow us to customize behavior of the rental agreements
    # on a granular level for each renter.
    create_table :rental_agreement_term_values do |t|
      t.references :rental_agreement_term, foreign_key: { to_table: :rental_agreement_terms }
      t.string :key
      t.text :value
      t.timestamps
    end

    create_table :payments do |t|
      t.references :customer, foreign_key: { to_table: :customers }
      t.integer :attachment_id
      t.integer :amount_in_cents
      t.date :date
      t.timestamps
    end

    create_table :rental_agreement_payments do |t|
      t.references :rental_agreement, foreign_key: { to_table: :rental_agreements }
      t.references :payment, foreing_key: { to_table: :payments }
      t.integer :paid_months
      t.date :paid_until
    end
  end
end
