class Payment < ApplicationRecord
  include Searchable
  belongs_to :customer

  has_many :rental_agreement_payments, inverse_of: :payment, dependent: :destroy
  has_many :rental_agreements, through: :rental_agreement_payments
  has_many :units, through: :rental_agreements
  has_many :invoices
  accepts_nested_attributes_for :rental_agreement_payments
  accepts_nested_attributes_for :invoices, update_only: true

  validates :date, presence: true

  def as_json(args = nil)
    return super(include: [:customer, :invoices]) if !args

    super({include: [:customer, :invoices]}.deep_merge(args))
  end

  def self.searchable_attributes
    []
  end
end
