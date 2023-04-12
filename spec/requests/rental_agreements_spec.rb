require 'rails_helper'

RSpec.describe "RentalAgreements", type: :request do
  describe "GET /api/rental_agreements" do
    before do
      @rental_agreement = create(:rental_agreement)
    end

    it "returns a list of rental_agreements" do
      get "/api/rental_agreements", headers: auth_headers

      data = JSON.parse(response.body)
      returned_ids = data.map { |x| x["id"] }

      expect(response).to have_http_status(:success)
      expect(returned_ids.include?(@rental_agreement.id)).to be_truthy
    end
  end

  describe "POST /api/rental_agreements" do
    before do
      @unit = create(:unit)
      @customer = create(:customer)
    end

    it "creates a new rental_agreement" do
      post "/api/rental_agreements", headers: auth_headers, as: :json, params: {
        rental_agreement: {
          unit_id: @unit.id,
          customer_id: @customer.id,
          start_date: Date.today,
          next_due_date: Date.today + 1.month,
          frequency_in_months: 1
        }
      }

      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["id"]).to_not eq(nil)
    end

    it "creates a new rental agreement with a new customer" do
      
      first_name = Faker::Name.first_name
      last_name = Faker::Name.last_name

      post "/api/rental_agreements", headers: auth_headers, as: :json, params: {
        rental_agreement: {
          unit_id: @unit.id,
          start_date: Date.today,
          next_due_date: Date.today + 1.month,
          frequency_in_months: 1,
          customer: {
            first_name: first_name,
            last_name: last_name
          }
        }
      }

      data = JSON.parse(response.body)
      expect(Customer.find_by(first_name: first_name, last_name: last_name)).to_not eq(nil)
      expect(data["id"]).to_not eq(nil)
    end

    it "updates the units occupancy status" do
      expect(@unit.occupied).to be_falsy
      post "/api/rental_agreements", headers: auth_headers, as: :json, params: {
        rental_agreement: {
          unit_id: @unit.id,
          customer_id: @customer.id,
          start_date: Date.today,
          next_due_date: Date.today + 1.month,
          frequency_in_months: 1
        }
      }

      expect(@unit.reload.occupied).to be_truthy
    end
  end

  describe "PUT /api/rental_agreements" do
    before do
      @rental_agreement = create(:rental_agreement)
    end

    it "updates an existing rental_agreement" do
      new_unit = create(:unit)
      new_customer = create(:customer)

      put "/api/rental_agreements/#{@rental_agreement.id}", headers: auth_headers, as: :json, params: {
        rental_agreement: {
          unit_id: new_unit.id,
          customer_id: new_customer.id,
          price_in_cents: 25000,
          start_date: Date.today,
          end_date: 2.months.from_now,
          next_due_date: 1.month.from_now,
          frequency_in_months: 6
        }
      }
      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["unit_id"]).to eq(new_unit.id)
      expect(data["customer_id"]).to eq(new_customer.id)
      expect(data["price_in_cents"]).to eq(25000)
      expect(data["start_date"]).to eq(Date.today.to_s)
      expect(data["end_date"]).to eq(2.months.from_now.to_date.to_s)
      expect(data["next_due_date"]).to eq(1.month.from_now.to_date.to_s)
      expect(data["frequency_in_months"]).to eq(6)
    end

    it "updates the units occupancy status" do
      unit = @rental_agreement.unit
      expect(unit.occupied).to be_truthy

      put "/api/rental_agreements/#{@rental_agreement.id}", headers: auth_headers, as: :json, params: {
        rental_agreement: {
          end_date: Date.today
        }
      }
      data = JSON.parse(response.body)
      expect(unit.reload.occupied).to be_falsy
    end
  end
  
  describe "DELETE /api/rental_agreements" do
    it "deletes an existing rental_agreement" do
      rental_agreement = create(:rental_agreement)
      rental_agreement_id = rental_agreement.id

      delete "/api/rental_agreements/#{rental_agreement_id}", headers: auth_headers

      expect(response).to have_http_status(:success)
      expect(RentalAgreement.find_by(id: rental_agreement_id)).to eq(nil)
    end
  end
end
