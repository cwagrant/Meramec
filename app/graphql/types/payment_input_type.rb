# frozen_string_literal: true

module Types
  class PaymentInputType < Types::BaseInputObject
    argument :id, ID, required: false
    argument :customer_id, ID, required: false
    argument :attachment_id, ID, required: false
    argument :amount_in_cents, Integer, required: false
    argument :date, GraphQL::Types::ISO8601Date, required: false
    argument :created_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :updated_at, GraphQL::Types::ISO8601DateTime, required: false
    argument :rental_agreement_payments, [Types::RentalAgreementPaymentInputType], required: false
  end
end
