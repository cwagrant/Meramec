require 'rails_helper'

RSpec.describe InvoiceItem, type: :model do
  describe "Update Rental Agreement" do
    before do
      @customer = create(:customer)
      @rental_agreement = create(:rental_agreement, customer: @customer)
    end

    it "changes the date on create" do
      @invoice = create(:invoice, customer: @customer)
      next_due_date = @rental_agreement.next_due_date

      add_months = @rental_agreement.frequency_in_months.months
      new_due_date = next_due_date + add_months

      create(:invoice_item, invoice: @invoice, item: @rental_agreement)

      expect(@rental_agreement.reload.next_due_date).to eq(new_due_date)
    end

    it "updates the date on update" do
      @invoice = create(:invoice, customer: @customer)
      next_due_date = @rental_agreement.next_due_date

      add_months = (@rental_agreement.frequency_in_months.months)
      new_due_date = next_due_date + add_months

      @item = create(:invoice_item, invoice: @invoice, item: @rental_agreement)

      expect(@rental_agreement.reload.next_due_date).to eq(new_due_date)

      updated_due_date = @rental_agreement.next_due_date
      update_count = 3 - @item.item_count
      update_months = (@rental_agreement.frequency_in_months * update_count).months

      updated_due_date = updated_due_date + update_months

      @item.update(item_count: 3)

      expect(@rental_agreement.reload.next_due_date).to eq(updated_due_date)
    end

    it "updates the date on update (negative count)" do
      @invoice = create(:invoice, customer: @customer)
      next_due_date = @rental_agreement.next_due_date


      add_months = (@rental_agreement.frequency_in_months * 3).months
      new_due_date = next_due_date + add_months

      @item = create(
        :invoice_item, 
        invoice: @invoice, 
        item: @rental_agreement, 
        item_count: 3
      )

      expect(@rental_agreement.reload.next_due_date).to eq(new_due_date)

      updated_due_date = @rental_agreement.next_due_date
      update_count = 1 - @item.item_count
      update_months = (@rental_agreement.frequency_in_months * update_count).months

      updated_due_date = updated_due_date + update_months

      @item.update(item_count: 1)

      expect(@rental_agreement.reload.next_due_date).to eq(updated_due_date)
    end
  end
end
