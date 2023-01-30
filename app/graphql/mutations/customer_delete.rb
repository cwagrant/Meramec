# frozen_string_literal: true

module Mutations
  class CustomerDelete < BaseMutation
    description "Deletes a customer by ID"

    field :customer, Types::CustomerType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      customer = ::Customer.find(id)
      raise GraphQL::ExecutionError.new "Error deleting customer", extensions: customer.errors.to_hash unless customer.destroy

      { customer: customer }
    end
  end
end
