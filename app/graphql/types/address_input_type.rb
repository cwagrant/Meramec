# frozen_string_literal: true

module Types
  class AddressInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :address_1, String, required: false
    argument :address_2, String, required: false
    argument :city, String, required: false
    argument :state_code, String, required: false
    argument :zipcode, String, required: false
    argument :country_code, String, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
