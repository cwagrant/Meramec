# frozen_string_literal: true

module Types
  class RentalAgreementPaymentType < Types::BaseObject
    field :id, ID, null: false
    field :rental_agreement_id, ID
    field :rental_agreement, Types::RentalAgreementType
    field :payment_id, ID
    field :payment, Types::PaymentType
    field :paid_months, Integer
    field :paid_until, GraphQL::Types::ISO8601Date
    field :amount_in_cents, Integer
    field :note, String
  end
end
