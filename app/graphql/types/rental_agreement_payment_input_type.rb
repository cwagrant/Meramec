# frozen_string_literal: true

module Types
  class RentalAgreementPaymentInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :rental_agreement_id, Integer, required: false
    argument :payment_id, Integer, required: false
    argument :paid_months, Integer, required: false
    argument :paid_until, GraphQL::Types::ISO8601Date, required: false
  end
end
