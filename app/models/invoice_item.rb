class InvoiceItem < ApplicationRecord
  belongs_to :invoice
  belongs_to :item, polymorphic: true
end
