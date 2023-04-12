class CustomersController < ApplicationController
  def index
    render json: Customer.search(params[:search], models: [Customer, Unit]).as_json
  end

  def show
    render json: Customer.find(params[:id]).as_json
  end

  def create
    full_params = customer_params
    
    if(full_params.key?(:address))
      full_params.merge!({address_attributes: full_params.delete(:address) || {}})
    end

    customer = Customer.new(full_params)

    if customer.save
      render json: customer.as_json
    else
      render json: {errors: customer.errors.full_messages}, status: 500
    end
  end

  def update
    full_params = customer_params
    
    if(full_params.key?(:address))
      full_params.merge!({address_attributes: full_params.delete(:address) || {}})
    end

    customer = Customer.find(params[:id])

    customer.update(full_params)

    if customer.errors.none?
      render json: customer.as_json
    else
      render json: {errors: customer.errors.full_messages}, status: 500
    end
  end

  def destroy
    customer = Customer.find(params[:id])

    if customer.destroy
      render json: { message: 'Success' }, status: :ok
    else
      render json: { errors: customer.errors.full_messages}, status: 500
    end
  end

  private

  def customer_params
    params.require(:customer).permit(
      :first_name,
      :last_name,
      :gate_code,
      :email,
      :company,
      :phone_number,
      address: [
        :id,
        :address_1,
        :address_2,
        :city,
        :state_code,
        :zipcode,
        :country_code
      ])
  end
end
