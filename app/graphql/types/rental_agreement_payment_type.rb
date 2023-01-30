# frozen_string_literal: true

module Types
  class RentalAgreementPaymentType < Types::BaseObject
    field :id, ID, null: false
    field :rental_agreement_id, Integer
    field :payment_id, Integer
    field :paid_months, Integer
    field :paid_until, GraphQL::Types::ISO8601Date
  end
end
