class RentalAgreement < ApplicationRecord
  include Searchable

  belongs_to :unit
  belongs_to :customer
  has_many :rental_agreement_terms
  accepts_nested_attributes_for :unit, :customer, allow_destroy: true
end
