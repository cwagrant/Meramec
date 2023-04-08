class PaymentsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:print]

  def index
    render json: Payment.includes(:customer).search(params[:search], models: [Payment, Customer]).as_json
  end

  def show
    render json: Payment.find(params[:id]).as_json
  end

  def create
    full_params = payment_params.to_h

    payment = Payment.new(full_params)

    if payment.save
      render json: payment.as_json
    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def update
    payment = Payment.find(params[:id])

    full_params = payment_params.to_h

    payment.update(full_params)

    if payment.errors.none?
      render json: payment.as_json

    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def destroy
    payment = Payment.find(params[:id])

    if payment.destroy
      render json: {}, status: :ok
    else
      render json: { errors: payment.errors.full_messages}, status: 500
    end
  end

  def print
    @payment = Payment.find(params[:id])
    @customer = @payment.customer
    @address = @payment.customer.address
    adjustments = @payment.invoices.flat_map(&:invoice_adjustments)
    @discounts = adjustments.find_all { |a| a.type_of == "discounts" }
    @fees = adjustments.find_all { |a| a.type_of == "fees" }
    @print_type = 'Receipt'
    html = render_to_string('payments/print', layout: 'pdfs')
    pdf = Grover.new(html).to_pdf
    filename = "#{Date.today.strftime("%Y-%m-%d")} #{@customer.first_name}-#{@customer.last_name}.pdf"
    send_data pdf, filename: filename
  end

  private

  def payment_params
    params.require(:payment).permit(
      :customer_id,
      :paid_in_cents,
      :fees_in_cents,
      :discounts_in_cents,
      :subtotal_in_cents,
      :total_in_cents,
      :date,
      :payment_type,
      :check_number,
      invoice_ids: [])
  end
end
