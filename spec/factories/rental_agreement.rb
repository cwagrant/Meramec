FactoryBot.define do

  factory :rental_agreement do
    association :unit
    association :customer
    price_in_cents { 10000 }
    start_date { Faker::Date.backward }
    next_due_date { Faker::Date.forward }
    frequency_in_months { 1 }
  end
end
