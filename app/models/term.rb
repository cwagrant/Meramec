class Term < ApplicationRecord
  has_many :rental_agreement_terms
  has_many :rental_agreements, through: :rental_agreement_terms

  enum term_type: {
    late_fee: 0,
    prorate: 1,
    discount: 2
  }
end
