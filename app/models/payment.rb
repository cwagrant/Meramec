class Payment < ApplicationRecord
  include Searchable
  belongs_to :customer

  has_many :invoices, dependent: :nullify

  accepts_nested_attributes_for :invoices, update_only: true
  validates :date, presence: true

  def as_json(args = nil)
    return super(include: [:customer, :invoices]) if !args

    super({include: [:customer, {invoices: {include: [:invoice_adjustments, :invoice_items]}}]}.deep_merge(args))
  end

  def self.searchable_attributes
    []
  end
end
