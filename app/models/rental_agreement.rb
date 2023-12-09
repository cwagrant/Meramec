class RentalAgreement < ApplicationRecord
  include Searchable

  attr_accessor :price

  belongs_to :unit
  belongs_to :customer

  has_one :property, through: :unit
  has_many :ledger_entries
  has_many :invoice_items, as: :item
  has_many :invoices, through: :invoice_items

  accepts_nested_attributes_for :unit, :customer

  after_save :update_unit_occupancy
  before_validation :set_price_in_cents

  scope :payment_due_on, ->(date) { where('next_due_date <= ?', date.to_date)}
  scope :active, -> { where(end_date: nil).or(where('end_date >= ?', Time.zone.now.to_date)) }

  delegate :name, to: :unit

  def balance
    ledger_entries.sum(:amount_in_cents)
  end

  def as_json(args)
    super({
      include: { 
        customer: {},
        property: {
          include: [:address]
        },
        unit: {
          include: [:address]
        }
      }
    }.merge(args))
  end

  def has_invoice_since?(date)
    last_invoice.date > (date - frequency_in_months.to_i.months)
  end

  def active
    end_date.blank? || end_date >= Time.zone.now.to_date
  end

  def push_due_date!(purchase_count = 1)
    return if next_due_date.blank?

    update(next_due_date: next_due_date + (purchase_count * frequency_in_months.to_i.months))
  end

  def after_create_invoice_item(count)
    new_due_date = next_due_date
    add_months = frequency_in_months * count
    
    if new_due_date.is_a?(Date) && add_months.is_a?(Integer)
      update(next_due_date: (new_due_date + add_months.months))
    end
  end

  def after_update_invoice_item(count, old_count)
    new_count = count - old_count

    after_create_invoice_item(new_count)
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
