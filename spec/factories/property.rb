FactoryBot.define do

  factory :property do
    name { Faker::Address.street_name }
    association :address
  end
end
