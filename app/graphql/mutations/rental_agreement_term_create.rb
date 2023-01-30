# frozen_string_literal: true

module Mutations
  class RentalAgreementTermCreate < BaseMutation
    description "Creates a new rental_agreement_term"

    field :rental_agreement_term, Types::RentalAgreementTermType, null: false

    argument :rental_agreement_term_input, Types::RentalAgreementTermInputType, required: true

    def resolve(rental_agreement_term_input:)
      rental_agreement_term = ::RentalAgreementTerm.new(**rental_agreement_term_input)
      raise GraphQL::ExecutionError.new "Error creating rental_agreement_term", extensions: rental_agreement_term.errors.to_hash unless rental_agreement_term.save

      { rental_agreement_term: rental_agreement_term }
    end
  end
end
