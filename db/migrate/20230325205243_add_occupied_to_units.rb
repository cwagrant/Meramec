class AddOccupiedToUnits < ActiveRecord::Migration[7.0]
  def change
    add_column :units, :occupied, :boolean, default: false
  end
end
