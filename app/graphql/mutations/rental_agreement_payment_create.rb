# frozen_string_literal: true

module Mutations
  class RentalAgreementPaymentCreate < BaseMutation
    description "Creates a new rental_agreement_payment"

    field :rental_agreement_payment, Types::RentalAgreementPaymentType, null: false

    argument :rental_agreement_payment_input, Types::RentalAgreementPaymentInputType, required: true

    def resolve(rental_agreement_payment_input:)
      rental_agreement_payment = ::RentalAgreementPayment.new(**rental_agreement_payment_input)
      raise GraphQL::ExecutionError.new "Error creating rental_agreement_payment", extensions: rental_agreement_payment.errors.to_hash unless rental_agreement_payment.save

      { rental_agreement_payment: rental_agreement_payment }
    end
  end
end
