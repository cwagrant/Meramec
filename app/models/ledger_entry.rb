class LedgerEntry < ApplicationRecord
  belongs_to :rental_agreement
  belongs_to :source, polymorphic: true, optional: true
end
