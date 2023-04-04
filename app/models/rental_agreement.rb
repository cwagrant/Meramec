class RentalAgreement < ApplicationRecord
  include Searchable

  attr_accessor :price

  belongs_to :unit
  belongs_to :customer

  has_many :ledger_entries
  has_many :invoice_items, as: :item
  has_many :invoices, through: :invoice_items

  accepts_nested_attributes_for :unit, :customer

  after_save :update_unit_occupancy
  before_validation :set_price_in_cents

  scope :payment_due_on, ->(date) { where('next_due_date <= ?', date.to_date)}
  scope :active, -> { where(end_date: nil).or(where('end_date >= ?', Time.zone.now.to_date)) }

  delegate :name, to: :unit

  # Need to make a dropdown field for frequency of "owes!" that will add 'frequency' amount
  # of months when the customer is charged.
  # Dropdown : Options [ Monthly, Quarterly, Semiannual, Yearly, Other]
  # When set to other the user cna enter a # of months, First 4 options will default
  # to a # of months on the backend.
  #
  # Secondly there will be a checkbox of Invoice. An invoice will be generated automatically
  # 1 month before the next_due_date.
  #
  # An invoice will need to be another table. Also an Invoice will use the Frequency to determine
  # when an invoice was last generated to avoid double-generation.
  #
  # E.g. 1 month before next_due_date an Invoice record is generated. The next time owes! runs it 
  # will check to make sure that Invoice doesn't exist before creating one.
  #
  # Invoice
  # - date
  # - rental_agreements
  # - invoice_adjustments
  # - price_in_cents
  #
  # Lets say I wanted to make it so that what all customers pay is an invoice. We could maintain
  # each RentalAgreement as a separate account and an Invoice could point to multiple of them
  # that need paid kind of like what a Payment does now but as one single thing.
  #
  # So an Invoice gets generated from RentalAgreements
  #
  # Okay okay so rethinking this
  #
  # Each (frequency) * 1.month a Customer generates an Invoice for each active rental agreement they
  # have. The invoice itself can have multiple fees or discounts attached to it but the total of the
  # invoice is what is due.
  #
  # RentalAgreements themselves do not have an account/amount tied to them. 
  #
  # How do we make this work with what we have? We create the Invoice record which connects to multiple
  # RentalAgreements and InvoiceAdjustments. 
  # So a Unit basically becomes a "Product" through a RentalAgreement.
  # 
  # We'll need some logic for Invoices to ignore rental agreements if they've had an invoice with a date
  # greater than the current date - their frequency in months. Also we'll need something to generate an
  # invoice in advance or manually.
  #

  def balance
    ledger_entries.sum(:amount_in_cents)
  end

  def as_json(args)
    super({include: { unit: { include: :property}, customer: {}}}.merge(args))
  end

  def has_invoice_since?(date)
    last_invoice.date > (date - frequency_in_months.to_i.months)
  end

  def push_due_date!(purchase_count = 1)
    return if next_due_date.blank?

    update(next_due_date: next_due_date + (purchase_count * frequency_in_months.to_i.months))
  end

  private

  def update_unit_occupancy
    if end_date.present?
      unit.update(occupied: false)
    else
      unit.update(occupied: true)
    end
  end

  def set_price_in_cents
    if price.blank?
      self.price_in_cents = unit.price_in_cents if price_in_cents.blank?
    else
      self.price_in_cents = (price.to_f * 100)
    end
  end
end
