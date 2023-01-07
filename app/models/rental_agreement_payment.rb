class RentalAgreementPayment < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :payment
end
