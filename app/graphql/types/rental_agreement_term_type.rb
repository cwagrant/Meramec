# frozen_string_literal: true

module Types
  class RentalAgreementTermType < Types::BaseObject
    field :id, ID, null: false
    field :rental_agreement_id, Integer
    field :term_id, Integer
    field :starts_at, GraphQL::Types::ISO8601Date
    field :ends_at, GraphQL::Types::ISO8601Date
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
