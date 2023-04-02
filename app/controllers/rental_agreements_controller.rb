class RentalAgreementsController < ApplicationController
  def index
    agreements = RentalAgreement.includes(:customer, :unit)
      .search(params[:search], models: [Customer, Unit])

    if params[:customer_id]
      agreements = agreements.where(customer_id: params[:customer_id])
    end

    render json: agreements
  end

  def show
    render json: RentalAgreement.find(params[:id])
  end

  def create
    full_params = rental_agreement_params.to_h.stringify_keys
    if full_params.key?('customer')
      customer = full_params.delete('customer')
      full_params["customer_attributes"] = customer if full_params['customer_id'].blank?
    end

    rental_agreement = RentalAgreement.new(full_params)

    if rental_agreement.save
      render json: rental_agreement
    else
      render json: {errors: rental_agreement.errors.full_messages}, status: 500
    end
  end

  def update
    rental_agreement = RentalAgreement.find(params[:id])

    full_params = rental_agreement_params.to_h.stringify_keys
    if full_params.key?('customer')
      customer = full_params.delete('customer')
      full_params["customer_attributes"] = customer if full_params['customer_id'].blank?
    end

    rental_agreement.update(full_params)

    if rental_agreement.errors.none?
      render json: rental_agreement
    else
      render json: {errors: rental_agreement.errors.full_messages}, status: 500
    end
  end

  def destroy
    rental_agreement = RentalAgreement.find(params[:id])

    if rental_agreement.destroy
      render json: {}, status: :ok
    else
      render json: { errors: rental_agreement.errors.full_messages}, status: 500
    end
  end

  private

  def rental_agreement_params
    params.require(:rental_agreement).permit(:start_date, :end_date, :next_due_date, :price, :unit_id, :customer_id, customer: [:first_name, :last_name, :email, :gate_code, :phone_number, :company])
  end
end
