# frozen_string_literal: true

module Mutations
  class PropertyDelete < BaseMutation
    description "Deletes a property by ID"

    field :property, Types::PropertyType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      property = ::Property.find(id)
      raise GraphQL::ExecutionError.new "Error deleting property", extensions: property.errors.to_hash unless property.destroy

      { property: property }
    end
  end
end
