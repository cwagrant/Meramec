class Unit < ApplicationRecord
  belongs_to :property
  has_many :rental_agreements

  enum type_of: [ :na, :apartment, :storage, :parking ]

  #todo limit to 1 active rental agreement at a time
end
