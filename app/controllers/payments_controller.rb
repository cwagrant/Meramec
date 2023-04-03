class PaymentsController < ApplicationController
  def index
    render json: Payment.includes(:customer).search(params[:search], models: [Payment, Customer, Unit]).as_json
  end

  def show
    render json: Payment.find(params[:id]).as_json(include: [:customer, {invoices: {include: :customer}}])
  end

  def create
    full_params = payment_params.to_h
    full_params.merge!({invoices_attributes: full_params.delete(:invoices)})

    payment = Payment.new(full_params)

    if payment.save
      render json: payment.as_json(include: [:customer, :invoices])
    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def update
    payment = Payment.find(params[:id])

    full_params = payment_params.to_h

    invoices = full_params.delete(:invoices)

    payment.update(full_params)

    if payment.errors.none?
      invoices.each do |invoice|
        invoice_id = invoice.dig(:id)
        next if invoice_id.blank?
        payment.invoices << Invoice.find(invoice_id)
      end
    end

    if payment.errors.none?
      render json: payment.as_json(include: [:customer, :invoices])

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

  private

  def payment_params
    params.require(:payment).permit(:customer_id, :price_in_cents, :date, :payment_type, :check_number, invoices: [:id])
  end
end
