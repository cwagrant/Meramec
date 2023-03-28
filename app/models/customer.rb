class Customer < ApplicationRecord
  include Searchable
  belongs_to :address, optional: true
  has_many :payments, dependent: :restrict_with_error
  has_many :rental_agreements, dependent: :restrict_with_error
  has_many :units, through: :rental_agreements

  def name
    "#{first_name} #{last_name}"
  end

  def formal_name
    "#{last_name}, #{first_name}"
  end

  def as_json(args = {})
    super({include: { rental_agreements: { include: {unit: {}}}}}.merge(args))
  end

  def self.searchable_attributes
    %w(first_name last_name company phone)
  end
end
