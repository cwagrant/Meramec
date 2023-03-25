class PaymentsController < ApplicationController
  def index
    render json: Payment.search(params[:search])
  end

  def show
    render json: Payment.find(params[:id])
  end

  def create
    full_params = payment_params.to_h

    full_params.merge!({rental_agreement_payments_attributes: full_params.delete(:rental_agreement_payments)})

    payment = Payment.new(full_params)

    if payment.save
      render json: payment
    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def update
    payment = Payment.find(params[:id])

    payment.update(payment_params)

    if payment.errors.none?
      render json: payment
    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def destroy
    payment = Payment.find(params[:id])

    return render json: { status: :ok }, status: :ok

    if payment.delete!
      render status: :ok
    else
      render json: { errors: payment.errors.full_messages}, status: 500
    end
  end

  private

  def payment_params
    params.require(:payment).permit(:customer_id, :date, rental_agreement_payments: [:rental_agreement_id, :amount, :note])
  end
end
