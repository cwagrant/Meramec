class Unit < ApplicationRecord
  include Searchable
  belongs_to :property
  belongs_to :address
  has_many :rental_agreements, dependent: :restrict_with_error

  accepts_nested_attributes_for :address, reject_if: :address_empty?

  enum type_of: [ :apartment, :storage, :parking ]

  #todo limit to 1 active rental agreement at a time

  attr_accessor :price

  before_validation :set_price_in_cents

  def self.searchable_attributes
    %w(name type_of)
  end

  def as_json(args = {})
    super({include: :address}.merge(args))
  end

  private

  def address_empty?(attr)
    attr['address_1'].blank?
  end

  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
