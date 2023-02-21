# frozen_string_literal: true

module Types
  class RentalAgreementInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :unit, Types::UnitInputType, required: false
    argument :customer, Types::CustomerInputType, required: false
    argument :search, String, required: false
    argument :unit_id, Integer, required: false
    argument :customer_id, Integer, required: false
    argument :price_in_cents, Integer, required: false
  end
end
