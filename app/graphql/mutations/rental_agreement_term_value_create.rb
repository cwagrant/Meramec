# frozen_string_literal: true

module Mutations
  class RentalAgreementTermValueCreate < BaseMutation
    description "Creates a new rental_agreement_term_value"

    field :rental_agreement_term_value, Types::RentalAgreementTermValueType, null: false

    argument :rental_agreement_term_value_input, Types::RentalAgreementTermValueInputType, required: true

    def resolve(rental_agreement_term_value_input:)
      rental_agreement_term_value = ::RentalAgreementTermValue.new(**rental_agreement_term_value_input)
      raise GraphQL::ExecutionError.new "Error creating rental_agreement_term_value", extensions: rental_agreement_term_value.errors.to_hash unless rental_agreement_term_value.save

      { rental_agreement_term_value: rental_agreement_term_value }
    end
  end
end
