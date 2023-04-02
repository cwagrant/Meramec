class PaymentsController < ApplicationController
  def index
    render json: Payment.includes(:customer).search(params[:search], models: [Payment, Customer, Unit]).as_json
  end

  def show
    render json: Payment.find(params[:id]).as_json(
      include: {
        rental_agreement_payments: {
          include: [
            {
              account_adjustments: {
                methods: :key
              }
            },
            {
              rental_agreement: {
                include: :unit
              }
            }
          ],
        }
      }
    )
  end

  def create
    full_params = payment_params.to_h
    full_params.merge!({rental_agreement_payments_attributes: full_params.delete(:rental_agreement_payments)})

    full_params[:rental_agreement_payments_attributes].each do |rap|
      rap.merge!({account_adjustments_attributes: rap.delete(:account_adjustments)})
    end

    payment = Payment.new(full_params)

    if payment.save
      render json: payment.as_json(
      include: {
        rental_agreement_payments: {
          include: [
            :account_adjustments, 
            {
              rental_agreement: {
                include: :unit
              }
            }
          ],
          methods: [ :amount ]

        }
      }
    )
    else
      render json: {errors: payment.errors.full_messages}, status: 500
    end
  end

  def update
    payment = Payment.find(params[:id])

    full_params = payment_params.to_h
    full_params.merge!({rental_agreement_payments_attributes: full_params.delete(:rental_agreement_payments)})

    full_params[:rental_agreement_payments_attributes].each do |rap|
      rap.merge!({account_adjustments_attributes: rap.delete(:account_adjustments)})
    end

    payment.update(full_params)

    if payment.errors.none?
      render json: payment.as_json(
      include: {
        rental_agreement_payments: {
          include: [
            :account_adjustments, 
            {
              rental_agreement: {
                include: :unit
              }
            }
          ],
          methods: [ :amount ]

        }
      }
    )

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
    params.require(:payment).permit(:customer_id, :date, rental_agreement_payments: [:id, :rental_agreement_id, :amount, :note, {account_adjustments: [ :id, :rental_agreement_id, :price, :reason, :reason_description, :type_of, :_destroy]}])
  end
end
