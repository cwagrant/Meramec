# frozen_string_literal: true

module Mutations
  class RentalAgreementPaymentDelete < BaseMutation
    description "Deletes a rental_agreement_payment by ID"

    field :rental_agreement_payment, Types::RentalAgreementPaymentType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      rental_agreement_payment = ::RentalAgreementPayment.find(id)
      raise GraphQL::ExecutionError.new "Error deleting rental_agreement_payment", extensions: rental_agreement_payment.errors.to_hash unless rental_agreement_payment.destroy

      { rental_agreement_payment: rental_agreement_payment }
    end
  end
end
