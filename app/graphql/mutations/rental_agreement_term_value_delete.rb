# frozen_string_literal: true

module Mutations
  class RentalAgreementTermValueDelete < BaseMutation
    description "Deletes a rental_agreement_term_value by ID"

    field :rental_agreement_term_value, Types::RentalAgreementTermValueType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      rental_agreement_term_value = ::RentalAgreementTermValue.find(id)
      raise GraphQL::ExecutionError.new "Error deleting rental_agreement_term_value", extensions: rental_agreement_term_value.errors.to_hash unless rental_agreement_term_value.destroy

      { rental_agreement_term_value: rental_agreement_term_value }
    end
  end
end
