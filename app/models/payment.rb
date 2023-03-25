class Payment < ApplicationRecord
  include Searchable
  belongs_to :customer

  has_many :rental_agreement_payments, inverse_of: :payment
  accepts_nested_attributes_for :rental_agreement_payments

  validates :date, presence: true

  def as_json(args)
    super({include: { customer: { methods: [:formal_name] }}}.merge(args))
  end

  def self.searchable_attributes
    []
  end
end
