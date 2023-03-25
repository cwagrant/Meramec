class RentalAgreement < ApplicationRecord
  include Searchable

  belongs_to :unit
  belongs_to :customer
  has_many :rental_agreement_terms
  has_many :ledger_entries
  accepts_nested_attributes_for :unit, :customer, allow_destroy: true

  scope :payment_due_on, ->(date) { where('next_due_date < ?', date.to_date)}
  scope :active, -> { where(end_date: nil) }

  def balance
    ledger_entries.sum(:amount_in_cents)
  end

  def as_json(args)
    super({include: { unit: {}, customer: { methods: [:formal_name] }}}.merge(args))
  end

  def owes!
    ledger_entries.create(
      source: self,
      amount_in_cents: price_in_cents * -1
    )

    update(next_due_date: Date.today + 1.month)
  end
end
