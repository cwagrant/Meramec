# frozen_string_literal: true

module Mutations
  class PaymentCreate < BaseMutation
    description "Creates a new payment"

    field :payment, Types::PaymentType, null: false

    argument :payment_input, Types::PaymentInputType, required: true

    def resolve(payment_input:)
      input = payment_input.to_h
      if(input.key?(:rental_agreement_payments))
        input[:rental_agreement_payments_attributes] = input.delete(:rental_agreement_payments)
      end

      payment = ::Payment.new(**input)
      raise GraphQL::ExecutionError.new "Error creating payment", extensions: payment.errors.to_hash unless payment.save

      { payment: payment }
    end
  end
end
