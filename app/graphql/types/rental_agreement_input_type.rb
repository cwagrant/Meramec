# frozen_string_literal: true

module Types
  class RentalAgreementInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :unit, Types::UnitInputType, required: false
    argument :customer, Types::CustomerInputType, required: false
    argument :search, String, required: false
    argument :unit_id, ID, required: false
    argument :customer_id, ID, required: false
    argument :price_in_cents, Integer, required: false
    argument :start_date, GraphQL::Types::ISO8601Date, required: false
    argument :end_date, GraphQL::Types::ISO8601Date, required: false
  end
end
