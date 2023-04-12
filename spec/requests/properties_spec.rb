require 'rails_helper'

RSpec.describe "Properties", type: :request do
  describe "GET /api/properties" do
    before do
      @property = create(:property)
    end

    it "returns a list of properties" do
      get "/api/properties", headers: auth_headers

      data = JSON.parse(response.body)
      returned_ids = data.map { |x| x["id"] }

      expect(response).to have_http_status(:success)
      expect(returned_ids.include?(@property.id)).to be_truthy
    end
  end

  describe "POST /api/properties" do
    it "creates a new property" do
      post "/api/properties", headers: auth_headers, as: :json, params: {
        property: {
          name: 'Oyster Bay'
        }
      }

      data = JSON.parse(response.body)

      expect(data["id"]).to_not eq(nil)
    end

    it "creates a new property with an address" do
      post "/api/properties", headers: auth_headers, as: :json, params: {
        property: {
          name: 'Oyster Bay',
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

      expect(data["id"]).to_not eq(nil)
      expect(data["address"]["city"]).to eq("Washington")
    end
  end

  describe "PUT /api/properties" do
    before do
      @property = create(:property)
    end

    it "updates an existing property" do
      new_name = Faker::Address.street_name

      put "/api/properties/#{@property.id}", headers: auth_headers, as: :json, params: {
        property: {
          name: new_name
        }
      }

      expect(JSON.parse(response.body)["name"]).to eq(new_name)
    end

    it "updates an existing property address" do
      new_address = Faker::Address.street_address

      put "/api/properties/#{@property.id}", headers: auth_headers, as: :json, params: {
        property: {
          address: {
            address_1: new_address
          }
        }
      }

      expect(JSON.parse(response.body)['address']['address_1']).to eq(new_address)
    end

    it "allows deleting an address" do
      put "/api/properties/#{@property.id}", headers: auth_headers, as: :json, params: {
        property: {
          address: {
            id: @property.address_id,
            _destroy: 1
          }
        }
      }

      expect(JSON.parse(response.body)['address']).to eq(nil)
    end
  end

  
  describe "DELETE /api/properties" do
    it "deletes an existing property" do
      property = create(:property)
      property_id = property.id

      delete "/api/properties/#{property_id}", headers: auth_headers

      expect(response).to have_http_status(:success)
      expect(Property.find_by(id: property_id)).to eq(nil)
    end
  end
end
