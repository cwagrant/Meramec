# frozen_string_literal: true

module Mutations
  class RentalAgreementDelete < BaseMutation
    description "Deletes a rental_agreement by ID"

    field :rental_agreement, Types::RentalAgreementType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      rental_agreement = ::RentalAgreement.find(id)
      raise GraphQL::ExecutionError.new "Error deleting rental_agreement", extensions: rental_agreement.errors.to_hash unless rental_agreement.destroy

      { rental_agreement: rental_agreement }
    end
  end
end
