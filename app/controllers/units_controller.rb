class UnitsController < ApplicationController
  def index
    units = Unit.search(params[:search])
    if(params[:property])
      render json: units.where(property_id: params[:property])
    else
      render json: units
    end
  end

  def show
    render json: Unit.find(params[:id]).as_json
  end

  def create
    full_params = unit_params

    if(full_params.key?(:address))
      full_params.merge!({address_attributes: full_params.delete(:address)})
    end

    unit = Unit.new(full_params)

    if unit.save
      render json: unit
    else
      render json: {errors: unit.errors.full_messages}, status: 500
    end
  end

  def update
    full_params = unit_params

    if(full_params.key?(:address))
      full_params.merge!({address_attributes: full_params.delete(:address)})
    end

    unit = Unit.find(params[:id])

    unit.update(full_params)

    if unit.errors.none?
      render json: unit
    else
      render json: {errors: unit.errors.full_messages}, status: 500
    end
  end

  def destroy
    unit = Unit.find(params[:id])

    if unit.destroy
      render json: {},  status: :ok
    else
      render json: { errors: unit.errors.full_messages}, status: 500
    end
  end

  private

  def unit_params
    params.require(:unit).permit(
      :price_in_cents,
      :type_of,
      :name,
      :property_id,
      address:[
        :address_1,
        :address_2,
        :city,
        :state_code,
        :zipcode,
        :country_code
      ])
  end
end
