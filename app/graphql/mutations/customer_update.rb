# frozen_string_literal: true

module Mutations
  class CustomerUpdate < BaseMutation
    description "Updates a customer by id"

    field :customer, Types::CustomerType, null: false

    argument :id, ID, required: true
    argument :customer_input, Types::CustomerInputType, required: true

    def resolve(id:, customer_input:)
      customer = ::Customer.find(id)
      raise GraphQL::ExecutionError.new "Error updating customer", extensions: customer.errors.to_hash unless customer.update(**customer_input)

      { customer: customer }
    end
  end
end
