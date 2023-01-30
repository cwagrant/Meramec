# frozen_string_literal: true

module Mutations
  class AddressUpdate < BaseMutation
    description "Updates a address by id"

    field :address, Types::AddressType, null: false

    argument :id, ID, required: true
    argument :address_input, Types::AddressInputType, required: true

    def resolve(id:, address_input:)
      address = ::Address.find(id)
      raise GraphQL::ExecutionError.new "Error updating address", extensions: address.errors.to_hash unless address.update(**address_input)

      { address: address }
    end
  end
end
