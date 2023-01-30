# frozen_string_literal: true

module Mutations
  class RentalAgreementTermDelete < BaseMutation
    description "Deletes a rental_agreement_term by ID"

    field :rental_agreement_term, Types::RentalAgreementTermType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      rental_agreement_term = ::RentalAgreementTerm.find(id)
      raise GraphQL::ExecutionError.new "Error deleting rental_agreement_term", extensions: rental_agreement_term.errors.to_hash unless rental_agreement_term.destroy

      { rental_agreement_term: rental_agreement_term }
    end
  end
end
