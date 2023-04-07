class ChangeAddressReferenceOnUnits < ActiveRecord::Migration[7.0]
  def change
    remove_reference :units, :address, index: true

    add_reference :units, :address, index: true, foreign_key: true
  end
end
