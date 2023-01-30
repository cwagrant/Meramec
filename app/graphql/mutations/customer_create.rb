# frozen_string_literal: true

module Mutations
  class CustomerCreate < BaseMutation
    description "Creates a new customer"

    field :customer, Types::CustomerType, null: false

    argument :customer_input, Types::CustomerInputType, required: true

    def resolve(customer_input:)
      customer = ::Customer.new(**customer_input)
      raise GraphQL::ExecutionError.new "Error creating customer", extensions: customer.errors.to_hash unless customer.save

      { customer: customer }
    end
  end
end
