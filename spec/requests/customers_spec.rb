require 'rails_helper'

RSpec.describe "Customers", type: :request do
  describe "GET /api/customers" do
    before do
      @customer = create(:customer)
    end

    it "returns a list of customers" do
      get "/api/customers", headers: auth_headers

      data = JSON.parse(response.body)
      returned_ids = data.map { |x| x["id"] }

      expect(response).to have_http_status(:success)
      expect(returned_ids.include?(@customer.id)).to be_truthy
    end
  end

  describe "POST /api/customers" do
    before do
      @property = create(:property)
    end

    it "creates a new customer" do
      post "/api/customers", headers: auth_headers, as: :json, params: {
        customer: {
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name
        }
      }

      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["id"]).to_not eq(nil)
    end

    it "creates a new customer with an address" do
      post "/api/customers", headers: auth_headers, as: :json, params: {
        customer: {
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          address: {
            address_1: '123 Main Street',
            city: 'Washington',
            state_code: 'MO',
            zipcode: '63090',
            country_code: 'USA'
          }
        }
      }

      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["id"]).to_not eq(nil)
      expect(data["address"]["city"]).to eq("Washington")
    end
  end

  describe "PUT /api/customers" do
    before do
      @customer = create(:customer)
    end

    it "updates an existing customer" do
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name
      email = Faker::Internet.email
      gate_code = rand(1000..9999).to_s
      phone_number = Faker::PhoneNumber.phone_number
      company = Faker::Company.name

      put "/api/customers/#{@customer.id}", headers: auth_headers, as: :json, params: {
        customer: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          gate_code: gate_code,
          phone_number: phone_number,
          company: company
        }
      }
      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["first_name"]).to eq(first_name)
      expect(data["last_name"]).to eq(last_name)
      expect(data["email"]).to eq(email)
      expect(data["gate_code"]).to eq(gate_code)
      expect(data["phone_number"]).to eq(phone_number)
      expect(data["company"]).to eq(company)
    end

    it "updates an existing customer address" do
      new_address = Faker::Address.street_address

      put "/api/customers/#{@customer.id}", headers: auth_headers, as: :json, params: {
        customer: {
          address: {
            address_1: new_address
          }
        }
      }

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['address']['address_1']).to eq(new_address)
    end

    it "allows deleting an address" do
      put "/api/customers/#{@customer.id}", headers: auth_headers, as: :json, params: {
        customer: {
          address: {
            id: @customer.address_id,
            _destroy: 1
          }
        }
      }

      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body)['address']).to eq(nil)
    end
  end

  
  describe "DELETE /api/customers" do
    it "updates an existing customer" do
      customer = create(:customer)
      customer_id = customer.id

      delete "/api/customers/#{customer_id}", headers: auth_headers

      expect(response).to have_http_status(:success)
      expect(Customer.find_by(id: customer_id)).to eq(nil)
    end
  end
end
