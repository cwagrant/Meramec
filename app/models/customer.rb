class Customer < ApplicationRecord
  include Searchable
  belongs_to :address, optional: true
  has_many :payments, dependent: :restrict_with_error
  has_many :rental_agreements, dependent: :restrict_with_error
  has_many :units, through: :rental_agreements
  has_many :invoices

  before_validation :set_formal_name

  accepts_nested_attributes_for :address, reject_if: :address_empty?

  def address_empty?(address)
    address["address_1"].blank?
  end

  def as_json(args = {})
    super({include: { address: [], invoices: [], payments: [], rental_agreements: { include: {unit: {}}, methods: :name }}}.merge(args))
  end

  def self.searchable_attributes
    %w(first_name last_name company phone)
  end

  private

  def set_formal_name
    self.formal_name = "#{last_name}, #{first_name}"
  end
end
