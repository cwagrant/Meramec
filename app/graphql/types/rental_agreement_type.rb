# frozen_string_literal: true

module Types
  class RentalAgreementType < Types::BaseObject
    field :id, ID, null: false
    field :unit_id, ID
    field :unit, Types::UnitType
    field :customer_id, ID
    field :customer, Types::CustomerType
    field :price_in_cents, Integer
    field :start_date, GraphQL::Types::ISO8601Date
    field :end_date, GraphQL::Types::ISO8601Date
  end
end
