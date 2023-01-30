# frozen_string_literal: true

module Types
  class PropertyType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :address_id, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :units, [Types::UnitType]
  end
end
