class Payment < ApplicationRecord
  belongs_to :customer

  has_many :rental_agreement_payments
  accepts_nested_attributes_for :rental_agreement_payments
end
