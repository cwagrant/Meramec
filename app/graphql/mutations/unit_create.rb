# frozen_string_literal: true

module Mutations
  class UnitCreate < BaseMutation
    description "Creates a new unit"

    field :unit, Types::UnitType, null: false

    argument :unit_input, Types::UnitInputType, required: true

    def resolve(unit_input:)
      unit = ::Unit.new(**unit_input)
      raise GraphQL::ExecutionError.new "Error creating unit", extensions: unit.errors.to_hash unless unit.save

      { unit: unit }
    end
  end
end
