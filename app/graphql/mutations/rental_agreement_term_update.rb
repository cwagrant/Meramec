# frozen_string_literal: true

module Mutations
  class RentalAgreementTermUpdate < BaseMutation
    description "Updates a rental_agreement_term by id"

    field :rental_agreement_term, Types::RentalAgreementTermType, null: false

    argument :id, ID, required: true
    argument :rental_agreement_term_input, Types::RentalAgreementTermInputType, required: true

    def resolve(id:, rental_agreement_term_input:)
      rental_agreement_term = ::RentalAgreementTerm.find(id)
      raise GraphQL::ExecutionError.new "Error updating rental_agreement_term", extensions: rental_agreement_term.errors.to_hash unless rental_agreement_term.update(**rental_agreement_term_input)

      { rental_agreement_term: rental_agreement_term }
    end
  end
end
