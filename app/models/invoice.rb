class Invoice < ApplicationRecord
  include Searchable
  belongs_to :customer
  belongs_to :payment, optional: true
  has_many :invoice_items
  has_many :invoice_adjustments

  attr_accessor :price

  accepts_nested_attributes_for :invoice_items, allow_destroy: true, reject_if: :empty_item?
  accepts_nested_attributes_for :invoice_adjustments, allow_destroy: true, reject_if: :empty_adjustment?

  before_save :clear_incorrect_items
  before_save :update_state_on_payment

  def update_state_on_payment
    if will_save_change_to_payment_id?
      self.state = "paid"
    end
  end

  def empty_item?(item_attr)
    item_attr['item_count'].blank? || item_attr['item_count'].zero?
  end

  def empty_adjustment?(item_attr)
    item_attr['price'].blank? && item_attr['price'].zero?
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
    # TODO this needs to handle end dates too
    #
    #
    # Probably want to include the next_due_date in the list of rental_agreements such that
    # we only get those w/ a next_due_date <= date and then we push out the next_due_date
    # by frequency. That will make it so that we should never get it multiple times.
    #
    # As a note the shovel operator will fire immediately on saved objects so when we do this
    # we'll want to avoid calling Invoice.create, instead we'll do an Invoice.new and if
    # rental agreements is empty after that then we can discard the Invoice rather than save.
    # However when we do create the Invoice then at that moment we need to update the
    # rental agreements next_due_dates.
    #
    # Likely this version will become the base that 'generate' will call and we'll just
    # auto pass in Date.today.
    #
    # Additional TODO: We need to create the CRUD for this in the UI. Probably something
    # on the customer page (or the Invoices index) that lets us create a new Invoice. If we
    # do it from an existing page we can probably pass in the customer info. But likely we'll
    # just get all the rental_agreements for the customer and create a line for each of them
    # on the page and then we'll have the total and subtotal areas.
    #
    # Then payments can be revamped to focus on marking an invoice as paid and possibly even
    # tracking attachments and such (as I know that was a request).

    running_total = 0
    customer.rental_agreements.where('start_date <= ?', date.to_date).each do |agreement|
      running_total = running_total + agreement.price_in_cents
      self.invoice_items << agreement
    end

    self.date = date
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
