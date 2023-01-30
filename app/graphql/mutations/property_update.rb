# frozen_string_literal: true

module Mutations
  class PropertyUpdate < BaseMutation
    description "Updates a property by id"

    field :property, Types::PropertyType, null: false

    argument :id, ID, required: true
    argument :property_input, Types::PropertyInputType, required: true

    def resolve(id:, property_input:)
      property = ::Property.find(id)
      raise GraphQL::ExecutionError.new "Error updating property", extensions: property.errors.to_hash unless property.update(**property_input)

      { property: property }
    end
  end
end
