FactoryBot.define do

  factory :address do
    address_1 { Faker::Address.street_address }
    city { Faker::Address.city }
    state_code { Faker::Address.state_abbr }
    zipcode { Faker::Address.zip }
  end
end
