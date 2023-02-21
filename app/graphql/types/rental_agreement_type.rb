# frozen_string_literal: true

module Types
  class RentalAgreementType < Types::BaseObject
    field :id, ID, null: false
    field :unit, Types::UnitType
    field :customer, Types::CustomerType
    field :price_in_cents, Integer
  end
end
