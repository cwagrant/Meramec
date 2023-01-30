class RentalAgreement < ApplicationRecord
  belongs_to :unit
  belongs_to :customer
  has_many :rental_agreement_terms
end
