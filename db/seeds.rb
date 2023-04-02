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
        property: property,
        price_in_cents: 2500 * rand(1..20)
      )
    }

    25.times {
      Customer.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: Faker::Internet.safe_email,
        gate_code: SecureRandom.random_number(10**6).to_s.last(4),
        address: Address.where.not(id: Property.all.pluck(:address_id)).sample,
        phone_number: Faker::PhoneNumber.cell_phone
      )
    }

    10.times{
      Customer
        .where(company: [nil, ""])
        .sample
        .update(company: Faker::Company.name)
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
    }

    Customer.all.each do |customer|
      next if customer.rental_agreements.none?

      earliest = customer.rental_agreements.map(&:start_date).min
      end_dates = customer.rental_agreements.map(&:end_date)
      latest = end_dates.include?(nil) ? Date.today : end_dates.max

      arel_table = RentalAgreement.arel_table

      next_date = earliest
      while(next_date < latest) do
        customer.rental_agreements.each { |ra| ra.owes!(next_date) }
        query = arel_table[:end_date].eq(nil).or(arel_table[:end_date].lteq(next_date))
        rental_agreements = customer.rental_agreements.where(start_date: earliest..next_date).where(query)

        raps = customer.rental_agreements.map do |ra|
          discount_price = 500 * SecureRandom.rand(0..1)

          {
            rental_agreement_id: ra.id,
            amount_in_cents: ra.price_in_cents - discount_price,
            account_adjustments_attributes: [{
              rental_agreement_id: ra.id,
              type_of: 'discount',
              reason: 'pre_payment',
              price_in_cents: discount_price
            }]
          }
        end

        Payment.create({
          customer_id: customer.id,
          date: next_date,
          rental_agreement_payments_attributes: raps
        })

        next_date = next_date + 1.month
      end
    end
  end
end

