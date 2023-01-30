# frozen_string_literal: true

module Types
  class TermType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :description, String
    field :term_type, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
