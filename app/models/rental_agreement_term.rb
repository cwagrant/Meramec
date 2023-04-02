class RentalAgreementTerm < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :term

  # We need a way to determine which values we need set by a Term
  # for a given RentalAgreementTerm
  #
  # E.g. some might need a dollar amount tied to them that is actionable
  # others might need just a block of text
  #


end
