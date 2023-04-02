class AddFormalNameToCustomers < ActiveRecord::Migration[7.0]
  def change
    add_column :customers, :formal_name, :string, default: ''
  end
end
