# frozen_string_literal: true

module Mutations
  class TermUpdate < BaseMutation
    description "Updates a term by id"

    field :term, Types::TermType, null: false

    argument :id, ID, required: true
    argument :term_input, Types::TermInputType, required: true

    def resolve(id:, term_input:)
      term = ::Term.find(id)
      raise GraphQL::ExecutionError.new "Error updating term", extensions: term.errors.to_hash unless term.update(**term_input)

      { term: term }
    end
  end
end
