class Invoice < ApplicationRecord
  include Searchable
  belongs_to :customer
  belongs_to :payment, optional: true
  has_many :invoice_items, dependent: :destroy, inverse_of: :invoice
  has_many :invoice_adjustments, dependent: :destroy
  has_many :rental_agreements, through: :invoice_items, source: :item, source_type: "RentalAgreement"

  attr_accessor :price

  accepts_nested_attributes_for :invoice_items, allow_destroy: true, reject_if: :empty_item?
  accepts_nested_attributes_for :invoice_adjustments, allow_destroy: true, reject_if: :empty_adjustment?

  before_save :clear_incorrect_items
  before_save :update_state_on_payment

  def update_state_on_payment
    if will_save_change_to_payment_id?
      if payment_id.present?
        self.state = "paid"
      end
    end
  end

  def empty_item?(item_attr)
    item_attr['item_count'].blank? || item_attr['item_count'].try(:zero?)
  end

  def empty_adjustment?(item_attr)
    item_attr['price'].blank? && item_attr['price'].try(:zero?)
  end

  def clear_incorrect_items
    self.invoice_items.each do |invoice_item|
      invoice_item.mark_for_destruction if invoice_item.item.customer != customer 
    end
  end

  def generate
    running_total = 0
    customer.rental_agreements.active.each do |agreement|
      running_total = running_total + agreement.price_in_cents
      self.invoice_items << agreement
    end

    self.date = Date.today
    self.subtotal_in_cents = running_total
    self.total_in_cents = running_total
  end

  def generate_for_date(date)
    running_total = 0
    customer.rental_agreements.payment_due_on(date).each do |agreement|
      running_total = running_total + agreement.price_in_cents
      self.rental_agreements << agreement
    end

    self.subtotal_in_cents = running_total
    self.total_in_cents = running_total
  end

  def self.searchable_attributes
    %w(id date) 
  end

  private

  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
