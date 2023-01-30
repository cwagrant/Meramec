# frozen_string_literal: true

module Types
  class RentalAgreementTermValueType < Types::BaseObject
    field :id, ID, null: false
    field :rental_agreement_term_id, Integer
    field :key, String
    field :value, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
