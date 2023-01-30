# frozen_string_literal: true

module Mutations
  class AddressCreate < BaseMutation
    description "Creates a new address"

    field :address, Types::AddressType, null: false

    argument :address_input, Types::AddressInputType, required: true

    def resolve(address_input:)
      address = ::Address.new(**address_input)
      raise GraphQL::ExecutionError.new "Error creating address", extensions: address.errors.to_hash unless address.save

      { address: address }
    end
  end
end
