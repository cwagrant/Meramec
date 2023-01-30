# frozen_string_literal: true

module Mutations
  class RentalAgreementUpdate < BaseMutation
    description "Updates a rental_agreement by id"

    field :rental_agreement, Types::RentalAgreementType, null: false

    argument :id, ID, required: true
    argument :rental_agreement_input, Types::RentalAgreementInputType, required: true

    def resolve(id:, rental_agreement_input:)
      rental_agreement = ::RentalAgreement.find(id)
      raise GraphQL::ExecutionError.new "Error updating rental_agreement", extensions: rental_agreement.errors.to_hash unless rental_agreement.update(**rental_agreement_input)

      { rental_agreement: rental_agreement }
    end
  end
end
