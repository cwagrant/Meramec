class RentalAgreementsController < ApplicationController
  def index
    render json: RentalAgreement.includes(:customer, :unit)
      .search(params[:search], models: [Customer])
  end

  def show
    render json: RentalAgreement.find(params[:id])
  end

  def create
    full_params = rental_agreement_params.to_h.stringify_keys
    if full_params.key?('customer')
      full_params["customer_attributes"] = full_params.delete('customer'))
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
      full_params["customer_attributes"] = full_params.delete('customer'))
    end

    binding.pry

    rental_agreement.update(full_params)

    if rental_agreement.errors.none?
      render json: rental_agreement
    else
      render json: {errors: rental_agreement.errors.full_messages}, status: 500
    end
  end

  def destroy
    rental_agreement = RentalAgreement.find(params[:id])

    if rental_agreement.delete!
      render status: :ok
    else
      render json: { errors: rental_agreement.errors.full_messages}, status: 500
    end
  end

  private

  def rental_agreement_params


    rental_params = params.require(:rental_agreement).permit(:start_date, :end_date, :next_due_date, :unit_id, :customer_id, customer: [:first_name, :last_name, :email, :gate_code])

    rental_params.to_h.merge(params.permit(customer: {}))
  end
end
