class UnitsController < ApplicationController
  def index
    render json: Unit.search(params[:search])
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

    return render json: { status: :ok }, status: :ok

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