# frozen_string_literal: true

module Mutations
  class TermDelete < BaseMutation
    description "Deletes a term by ID"

    field :term, Types::TermType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      term = ::Term.find(id)
      raise GraphQL::ExecutionError.new "Error deleting term", extensions: term.errors.to_hash unless term.destroy

      { term: term }
    end
  end
end
