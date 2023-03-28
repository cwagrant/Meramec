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
    render json: Unit.find(params[:id])
  end

  def create
    unit = Unit.new(unit_params)

    if unit.save
      render json: unit
    else
      render json: {errors: unit.errors.full_messages}, status: 500
    end
  end

  def update
    unit = Unit.find(params[:id])

    unit.update(unit_params)

    if unit.errors.none?
      render json: unit
    else
      render json: {errors: unit.errors.full_messages}, status: 500
    end
  end

  def destroy
    unit = Unit.find(params[:id])

    if unit.delete!
      render status: :ok
    else
      render json: { errors: unit.errors.full_messages}, status: 500
    end
  end

  private

  def unit_params
    params.require(:unit).permit(:price, :type_of, :name, :property_id, :price_in_cents)
  end
end
