# frozen_string_literal: true

module Mutations
  class PaymentUpdate < BaseMutation
    description "Updates a payment by id"

    field :payment, Types::PaymentType, null: false

    argument :id, ID, required: true
    argument :payment_input, Types::PaymentInputType, required: true

    def resolve(id:, payment_input:)
      payment = ::Payment.find(id)
      raise GraphQL::ExecutionError.new "Error updating payment", extensions: payment.errors.to_hash unless payment.update(**payment_input)

      { payment: payment }
    end
  end
end
