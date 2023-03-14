# frozen_string_literal: true

module Types
  class RentalAgreementPaymentInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :rental_agreement_id, ID, required: false
    argument :payment_id, ID, required: false
    argument :paid_months, Integer, required: false
    argument :paid_until, GraphQL::Types::ISO8601Date, required: false
    argument :amount_in_cents, Integer, required: false
    argument :note, String, required: false
  end
end
