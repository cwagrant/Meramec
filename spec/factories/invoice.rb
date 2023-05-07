FactoryBot.define do

  factory :invoice do
    association :customer
    state { "pending" }
    subtotal_in_cents { 10000 }
    total_in_cents { 10000 }
    date { Faker::Date.backward }

    after(:create) do |invoice|
      rental_agreement = create(:rental_agreement, customer: invoice.customer)
      create(:invoice_item, invoice: invoice, item: rental_agreement)
    end
  end
end
