# frozen_string_literal: true

module Mutations
  class AddressDelete < BaseMutation
    description "Deletes a address by ID"

    field :address, Types::AddressType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      address = ::Address.find(id)
      raise GraphQL::ExecutionError.new "Error deleting address", extensions: address.errors.to_hash unless address.destroy

      { address: address }
    end
  end
end
