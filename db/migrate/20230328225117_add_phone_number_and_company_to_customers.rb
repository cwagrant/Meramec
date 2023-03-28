class AddPhoneNumberAndCompanyToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :phone_number, :string
    add_column :customers, :company, :string
  end
end
