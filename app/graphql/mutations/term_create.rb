# frozen_string_literal: true

module Mutations
  class TermCreate < BaseMutation
    description "Creates a new term"

    field :term, Types::TermType, null: false

    argument :term_input, Types::TermInputType, required: true

    def resolve(term_input:)
      term = ::Term.new(**term_input)
      raise GraphQL::ExecutionError.new "Error creating term", extensions: term.errors.to_hash unless term.save

      { term: term }
    end
  end
end
