# frozen_string_literal: true

module Types
  class RentalAgreementTermInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :rental_agreement_id, Integer, required: false
    argument :term_id, Integer, required: false
    argument :starts_at, GraphQL::Types::ISO8601Date, required: false
    argument :ends_at, GraphQL::Types::ISO8601Date, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
  end
end
