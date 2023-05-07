require 'rails_helper'

RSpec.describe "Invoices", type: :request do
  describe "GET /api/invoices" do
    before do
      @invoice = create(:invoice)
    end

    it "returns a list of invoices" do
      get "/api/invoices", headers: auth_headers

      data = JSON.parse(response.body)
      returned_ids = data.map { |x| x["id"] }

      expect(response).to have_http_status(:success)
      expect(returned_ids.include?(@invoice.id)).to be_truthy
    end
  end

  describe "POST /api/invoices" do
    before do
      @rental_agreement = create(:rental_agreement)
      @invoice = create(:invoice)
    end

    it "creates a new invoice" do
      post "/api/invoices", headers: auth_headers, as: :json, params: {
        invoice: {
          customer_id: @rental_agreement.customer.id,
          date: Date.today,
          subtotal_in_cents: @rental_agreement.price_in_cents,
          total_in_cents: @rental_agreement.price_in_cents,
          invoice_items: [{item_id: @rental_agreement.id, item_type: @rental_agreement.class.to_s, item_count: 1}]
        }
      }

      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["id"]).to_not eq(nil)
      expect(data["invoice_items"].length).to eq(1)
    end

    it "creates a new invoice with an adjustment" do
      post "/api/invoices", headers: auth_headers, as: :json, params: {
        invoice: {
          customer_id: @rental_agreement.customer.id,
          date: Date.today,
          subtotal_in_cents: @rental_agreement.price_in_cents - 500,
          total_in_cents: @rental_agreement.price_in_cents - 500,
          invoice_items: [{item_id: @rental_agreement.id, item_type: @rental_agreement.class.to_s, item_count: 1}],
          invoice_adjustments: [{type_of: "discount", reason: "prepay", price_in_cents: 500}]
        }
      }

      data = JSON.parse(response.body)
      expect(data["id"]).to_not eq(nil)
      expect(data["invoice_adjustments"].length).to eq(1)
    end
  end

  describe "PUT /api/invoices" do
    before do
      @invoice = create(:invoice)
      @rental_agreement = create(:rental_agreement, customer: @invoice.customer)
      @invoice.reload
      @invoice_item = @invoice.invoice_items.first
    end

    it "updates an existing invoice" do
      put "/api/invoices/#{@invoice.id}", headers: auth_headers, as: :json, params: {
        invoice: {
          state: "sent",
          date: 1.day.ago.to_s,
          invoice_items: [@invoice_item, {item_id: @rental_agreement.id, item_type: @rental_agreement.class.to_s, item_count: "2"}],
        }
      }
      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)

      expect(data["date"]).to eq(1.day.ago.to_date.to_s)
      expect(data["state"]).to eq("sent")
      expect(data["invoice_items"].length).to eq(2)
    end

    it "removes invoice items that don't belong to the customer" do
      @agreement = create(:rental_agreement)

      put "/api/invoices/#{@invoice.id}", headers: auth_headers, as: :json, params: {
        invoice: {
          state: "sent",
          date: 1.day.ago.to_s,
          invoice_items: [@invoice_item, {item_id: @agreement.id, item_type: @agreement.class.to_s, item_count: "2"}],
        }
      }
      data = JSON.parse(response.body)

      expect(response).to have_http_status(:success)
      expect(data["invoice_items"].length).to eq(1)
    end
  end
  
  describe "DELETE /api/invoices" do
    it "deletes an existing invoice" do
      invoice = create(:invoice)
      invoice_id = invoice.id

      delete "/api/invoices/#{invoice_id}", headers: auth_headers

      expect(response).to have_http_status(:success)
      expect(Invoice.find_by(id: invoice_id)).to eq(nil)
    end
  end
end
