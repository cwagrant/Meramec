# frozen_string_literal: true

module Mutations
  class RentalAgreementPaymentUpdate < BaseMutation
    description "Updates a rental_agreement_payment by id"

    field :rental_agreement_payment, Types::RentalAgreementPaymentType, null: false

    argument :id, ID, required: true
    argument :rental_agreement_payment_input, Types::RentalAgreementPaymentInputType, required: true

    def resolve(id:, rental_agreement_payment_input:)
      rental_agreement_payment = ::RentalAgreementPayment.find(id)
      raise GraphQL::ExecutionError.new "Error updating rental_agreement_payment", extensions: rental_agreement_payment.errors.to_hash unless rental_agreement_payment.update(**rental_agreement_payment_input)

      { rental_agreement_payment: rental_agreement_payment }
    end
  end
end
