class Property < ApplicationRecord
  belongs_to :address, optional: true
  has_many :units
end
