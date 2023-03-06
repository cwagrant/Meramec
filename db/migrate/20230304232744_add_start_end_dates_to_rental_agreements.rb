class AddStartEndDatesToRentalAgreements < ActiveRecord::Migration[7.0]
  def change
    change_table :rental_agreements do |t|
      t.date :start_date
      t.date :end_date
    end
  end
end
