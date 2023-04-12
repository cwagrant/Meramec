FactoryBot.define do

  factory :customer do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    company { Faker::Company.name }
    email { Faker::Internet.email }
    phone_number { Faker::PhoneNumber.phone_number }

    trait :with_address do
      after(:create) do |customer|
        new_address = create(:address)
        customer.update(address_id: new_address.id)
      end
    end
  end
end
