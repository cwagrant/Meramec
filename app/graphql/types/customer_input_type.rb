# frozen_string_literal: true

module Types
  class CustomerInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :name, String, required: false
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :email, String, required: false
    argument :gate_code, String, required: false
    argument :address_id, Integer, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
