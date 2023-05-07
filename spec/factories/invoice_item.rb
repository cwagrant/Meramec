FactoryBot.define do

  factory :invoice_item do
    association :invoice
    association :item, factory: :rental_agreement
    item_count { 1 }
  end
end
