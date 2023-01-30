# frozen_string_literal: true

module Types
  class RentalAgreementType < Types::BaseObject
    field :id, ID, null: false
    field :unit_id, Integer
    field :customer_id, Integer
    field :price_in_cents, Integer
  end
end
