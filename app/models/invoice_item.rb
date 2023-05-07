class InvoiceItem < ApplicationRecord
  belongs_to :invoice, inverse_of: :invoice_items
  belongs_to :item, polymorphic: true

  after_create :after_create_invoice_item
  after_update :after_update_invoice_item

  private

  def after_create_invoice_item
    return unless item.respond_to?(:after_create_invoice_item)

    item.after_create_invoice_item(item_count)
  end

  def after_update_invoice_item
    return unless item.respond_to?(:after_update_invoice_item)
    old_item_count = previous_changes['item_count'][0]

    item.after_update_invoice_item(item_count, old_item_count)
  end
end
