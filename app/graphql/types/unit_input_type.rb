# frozen_string_literal: true

module Types
  class UnitInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: false
    argument :type_of, Integer, required: false
    argument :price_in_cents, Integer, required: false
    argument :property_id, ID, required: false
    argument :address_id, Integer, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
