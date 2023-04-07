class PropertiesController < ApplicationController
  def index
    render json: Property.search(params[:search])
  end

  def show
    render json: Property.find(params[:id]).as_json(include: :address)
  end

  def create
    full_params = property_params

    full_params.merge!({address_attributes: full_params.delete(:address)})
    property = Property.new(full_params)

    if property.save
      render json: property
    else
      render json: {errors: property.errors.full_messages}, status: 500
    end
  end

  def update
    property = Property.find(params[:id])

    full_params = property_params

    full_params.merge!({address_attributes: full_params.delete(:address)})
    property.update(full_params)

    if property.errors.none?
      render json: property
    else
      render json: {errors: property.errors.full_messages}, status: 500
    end
  end

  def destroy
    property = Property.find(params[:id])

    if property.destroy
      render json: {}, status: :ok
    else
      render json: { errors: property.errors.full_messages}, status: 403
    end
  end

  private

  def property_params
    params.require(:property).permit(
      :name,
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
