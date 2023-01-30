# frozen_string_literal: true

module Mutations
  class PaymentDelete < BaseMutation
    description "Deletes a payment by ID"

    field :payment, Types::PaymentType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      payment = ::Payment.find(id)
      raise GraphQL::ExecutionError.new "Error deleting payment", extensions: payment.errors.to_hash unless payment.destroy

      { payment: payment }
    end
  end
end
