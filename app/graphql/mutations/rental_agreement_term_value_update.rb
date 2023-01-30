# frozen_string_literal: true

module Mutations
  class RentalAgreementTermValueUpdate < BaseMutation
    description "Updates a rental_agreement_term_value by id"

    field :rental_agreement_term_value, Types::RentalAgreementTermValueType, null: false

    argument :id, ID, required: true
    argument :rental_agreement_term_value_input, Types::RentalAgreementTermValueInputType, required: true

    def resolve(id:, rental_agreement_term_value_input:)
      rental_agreement_term_value = ::RentalAgreementTermValue.find(id)
      raise GraphQL::ExecutionError.new "Error updating rental_agreement_term_value", extensions: rental_agreement_term_value.errors.to_hash unless rental_agreement_term_value.update(**rental_agreement_term_value_input)

      { rental_agreement_term_value: rental_agreement_term_value }
    end
  end
end
