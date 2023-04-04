class InvoiceItem < ApplicationRecord
  belongs_to :invoice
  belongs_to :item, polymorphic: true

  after_create :push_next_due_date

  private

  def push_next_due_date
    return if item_type != 'RentalAgreement'

    item.push_due_date!(item_count)
  end
end
