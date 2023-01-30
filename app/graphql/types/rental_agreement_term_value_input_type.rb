# frozen_string_literal: true

module Types
  class RentalAgreementTermValueInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :rental_agreement_term_id, Integer, required: false
    argument :key, String, required: false
    argument :value, String, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
