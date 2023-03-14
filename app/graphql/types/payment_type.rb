# frozen_string_literal: true

module Types
  class PaymentType < Types::BaseObject
    field :id, ID, null: false
    field :customer_id, ID
    field :customer, Types::CustomerType
    field :rental_agreement_payments, [Types::RentalAgreementPaymentType]
    field :attachment_id, ID
    field :amount_in_cents, Integer
    field :date, GraphQL::Types::ISO8601Date
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
