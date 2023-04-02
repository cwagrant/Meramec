class RentalAgreement < ApplicationRecord
  include Searchable

  attr_accessor :price

  belongs_to :unit
  belongs_to :customer

  has_many :ledger_entries
  has_many :rental_agreement_payments

  accepts_nested_attributes_for :unit, :customer

  after_save :update_unit_occupancy
  before_validation :set_price_in_cents

  scope :payment_due_on, ->(date) { where('next_due_date <= ?', date.to_date)}
  scope :active, -> { where(end_date: nil).or(where('end_date >= ?', Time.zone.now.to_date)) }

  def balance
    ledger_entries.sum(:amount_in_cents)
  end

  def as_json(args)
    super({include: { unit: { include: :property}, customer: {}}}.merge(args))
  end

  def owes!(date)
    ledger_entries.create(
      date: date || Date.today,
      source: self,
      amount_in_cents: (price_in_cents || 0) * -1
    )

    update(next_due_date: (next_due_date || Date.today) + 1.month)
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
