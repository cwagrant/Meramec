class Address < ApplicationRecord
  has_one :property, dependent: :nullify
  has_one :unit, dependent: :nullify
  has_one :customer, dependent: :nullify
end
