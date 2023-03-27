class PropertiesController < ApplicationController
  def index
    render json: Property.search(params[:search])
  end

  def show
    render json: Property.find(params[:id])
  end

  def create
    property = Property.new(property_params)

    if property.save
      render json: property
    else
      render json: {errors: property.errors.full_messages}, status: 500
    end
  end

  def update
    property = Property.find(params[:id])

    property.update(property_params)

    if property.errors.none?
      render json: property
    else
      render json: {errors: property.errors.full_messages}, status: 500
    end
  end

  def destroy
    property = Property.find(params[:id])

    if property.destroy
      render status: :ok
    else
      render json: { errors: property.errors.full_messages}, status: 403
    end
  end

  private

  def property_params
    params.require(:property).permit(:name)
  end
end
