# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
#
#
#
#
def create_rat(ra, term)
  RentalAgreementTerm.create(
    rental_agreement: ra,
    term: term
  )
end

def getDates()
  startDate = Date.today - rand(10000)
  date = Date.today - rand(10000)
  closeDate = startDate >= date ? nil : date

  {open: startDate, close: closeDate}
end

if User.none?
  User.create(
    email: 'admin@admin.com',
    password: 'password'
  )
end

unless Rails.env.production?
  ActiveRecord::Base.transaction do 

    late_fee = Term.create(
      name: 'Late Fee',
      description: 'Fee for when customers fail to pay within 5 days.'
    )

    prorate = Term.create(
      name: 'Prorate',
      description: 'Prorated amount charged to the customer.',
      term_type: :prorate
    )

    discount = Term.create(
      name: 'Prepay Discount',
      description: 'Amount discounted from the customers bill for prepaying for the month.',
      term_type: :discount
    )

    types = %w(apartment storage parking)

    100.times {
      Address.create(
        address_1: Faker::Address.street_address,
        city: Faker::Address.city,
        state_code: Faker::Address.state,
        zipcode: Faker::Address.zip_code
      )
    }

    5.times {
      address = Address.all.sample
      Property.create(
        name: address.address_1.gsub(/\d+ /, ''),
        address: address
      )
    }

    last_id = 0
    50.times {
      property = Property.where.not(id: last_id).sample
      last_id = property.id

      Unit.create(
        name: "#{Faker::Alphanumeric.alpha.last(2).upcase}#{SecureRandom.rand(100)}",
        type_of: types.sample,
        price_in_cents: SecureRandom.rand(30000),
        property: property
      )
    }

    25.times {
      Customer.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.safe_email,
        gate_code: SecureRandom.random_number(10**6).to_s.last(4),
        address: Address.where.not(id: Property.all.pluck(:address_id)).sample
      )
    }

    used_ids = []

    35.times {
      unit = Unit.where.not(id: used_ids).sample
      used_ids << unit.id

      dates = getDates

      ra = RentalAgreement.create(
        unit: unit,
        customer: Customer.all.sample,
        start_date: dates[:open],
        end_date: dates[:close]
      )

      terms = Term.all.sample(SecureRandom.rand(3))

      terms.each do |term|
        create_rat(ra, term)
      end
    }
  end
end

