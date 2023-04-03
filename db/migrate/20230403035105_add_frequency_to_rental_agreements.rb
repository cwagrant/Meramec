class AddFrequencyToRentalAgreements < ActiveRecord::Migration[7.0]
  def change
    add_column :rental_agreements, :frequency_in_months, :integer, default: 1
  end
end
