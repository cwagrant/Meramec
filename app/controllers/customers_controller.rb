class CustomersController < ApplicationController
  def index
    render json: Customer.search(params[:search], models: [Customer, Unit]).as_json(methods: [:formal_name])
  end

  def show
    render json: Customer.find(params[:id])
  end

  def create
    customer = Customer.new(customer_params)

    if customer.save
      render json: customer
    else
      render json: {errors: customer.errors.full_messages}, status: 500
    end
  end

  def update
    customer = Customer.find(params[:id])

    customer.update(customer_params)

    if customer.errors.none?
      render json: customer
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
    params.require(:customer).permit(:first_name, :last_name, :gate_code, :email, :company, :phone_number)
  end
end
