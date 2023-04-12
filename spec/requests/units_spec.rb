require 'rails_helper'

RSpec.describe "Units", type: :request do
  describe "GET /api/units" do
    before do
      @unit = create(:unit)
    end

    it "returns a list of units" do
      get "/api/units", headers: auth_headers

      data = JSON.parse(response.body)
      returned_ids = data.map { |x| x["id"] }

      expect(response).to have_http_status(:success)
      expect(returned_ids.include?(@unit.id)).to be_truthy
    end
  end

  describe "POST /api/units" do
    before do
      @property = create(:property)
    end

    it "creates a new unit" do
      post "/api/units", headers: auth_headers, as: :json, params: {
        unit: {
          name: 'Oyster Bay',
          property_id: @property.id
        }
      }

      data = JSON.parse(response.body)

      expect(data["id"]).to_not eq(nil)
    end

    it "creates a new unit with an address" do
      post "/api/units", headers: auth_headers, as: :json, params: {
        unit: {
          name: 'Oyster Bay',
          property_id: @property.id,
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

  describe "PUT /api/units" do
    before do
      @unit = create(:unit)
    end

    it "updates an existing unit" do
      new_name = Faker::Address.street_name
      new_property = create(:property)

      put "/api/units/#{@unit.id}", headers: auth_headers, as: :json, params: {
        unit: {
          name: new_name,
          type_of: 'storage',
          price_in_cents: 25000,
          property_id: new_property.id
        }
      }

      expect(JSON.parse(response.body)["name"]).to eq(new_name)
      expect(JSON.parse(response.body)["type_of"]).to eq("storage")
      expect(JSON.parse(response.body)["price_in_cents"]).to eq(25000)
      expect(JSON.parse(response.body)["property_id"]).to eq(new_property.id)
    end

    it "updates an existing unit address" do
      new_address = Faker::Address.street_address

      put "/api/units/#{@unit.id}", headers: auth_headers, as: :json, params: {
        unit: {
          address: {
            address_1: new_address
          }
        }
      }

      expect(JSON.parse(response.body)['address']['address_1']).to eq(new_address)
    end

    it "allows deleting an address" do
      put "/api/units/#{@unit.id}", headers: auth_headers, as: :json, params: {
        unit: {
          address: {
            id: @unit.address_id,
            _destroy: 1
          }
        }
      }
      expect(JSON.parse(response.body)['address']).to eq(nil)
    end
  end

  
  describe "DELETE /api/units" do
    it "updates an existing unit" do
      unit = create(:unit)
      unit_id = unit.id

      delete "/api/units/#{unit_id}", headers: auth_headers

      expect(response).to have_http_status(:success)
      expect(Unit.find_by(id: unit_id)).to eq(nil)
    end
  end
end
