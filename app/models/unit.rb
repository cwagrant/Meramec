class Unit < ApplicationRecord
  include Searchable
  belongs_to :property
  has_many :rental_agreements

  enum type_of: [ :apartment, :storage, :parking ]

  #todo limit to 1 active rental agreement at a time

  attr_accessor :price

  before_validation :set_price_in_cents

  def self.searchable_attributes
    %w(name type_of)
  end

  def occupied
    rental_agreements.where(end_date: nil).any?
  end

  def as_json(args)
    super({methods: [:occupied] }.merge(args))
  end

  private

  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
