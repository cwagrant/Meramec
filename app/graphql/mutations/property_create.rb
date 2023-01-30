# frozen_string_literal: true

module Mutations
  class PropertyCreate < BaseMutation
    description "Creates a new property"

    field :property, Types::PropertyType, null: false

    argument :property_input, Types::PropertyInputType, required: true

    def resolve(property_input:)
      property = ::Property.new(**property_input)
      raise GraphQL::ExecutionError.new "Error creating property", extensions: property.errors.to_hash unless property.save

      { property: property }
    end
  end
end
