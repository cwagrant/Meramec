# frozen_string_literal: true

module Mutations
  class PaymentCreate < BaseMutation
    description "Creates a new payment"

    field :payment, Types::PaymentType, null: false

    argument :payment_input, Types::PaymentInputType, required: true

    def resolve(payment_input:)
      payment = ::Payment.new(**payment_input)
      raise GraphQL::ExecutionError.new "Error creating payment", extensions: payment.errors.to_hash unless payment.save

      { payment: payment }
    end
  end
end
