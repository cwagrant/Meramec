# frozen_string_literal: true

module Types
  class UnitType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    # Note: Due to how rails enums work, we'll have to set this field to be a String
    # as otherwise graphql returns 0 because rails returns the text value of the enum
    # rather than the number from the database
    field :type_of, String
    field :price_in_cents, Integer
    field :property_id, ID
    field :address_id, Integer
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :property, Types::PropertyType
    field :occupied, Boolean
  end
end
