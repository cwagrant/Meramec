class InvoiceAdjustment < ApplicationRecord
  belongs_to :invoice

  attr_accessor :price

  private

  def set_price_in_cents
    return if price.blank?

    self.price_in_cents = (price.to_f * 100)
  end
end
