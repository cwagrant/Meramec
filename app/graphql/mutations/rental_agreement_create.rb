# frozen_string_literal: true

module Mutations
  class RentalAgreementCreate < BaseMutation
    description "Creates a new rental_agreement"

    field :rental_agreement, Types::RentalAgreementType, null: false

    argument :rental_agreement_input, Types::RentalAgreementInputType, required: true

    def resolve(rental_agreement_input:)
      rental_agreement = ::RentalAgreement.new(**rental_agreement_input)
      raise GraphQL::ExecutionError.new "Error creating rental_agreement", extensions: rental_agreement.errors.to_hash unless rental_agreement.save

      { rental_agreement: rental_agreement }
    end
  end
end
