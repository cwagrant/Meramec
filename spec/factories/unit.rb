FactoryBot.define do

  factory :unit do
    association :property
    name { "#{Faker::Alphanumeric.alpha.last(2).upcase}#{SecureRandom.rand(100)}" }
    type_of { 'apartment' }
    price_in_cents { 10000 }

    trait :with_address do
      after(:create) do |unit|
        new_address = create(:address)
        unit.update(address_id: new_address.id)
      end
    end
  end
end
