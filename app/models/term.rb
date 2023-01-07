class Term < ApplicationRecord
  has_many :rental_agreement_terms
  has_many :rental_agreements through: :rental_agreement_terms
end
