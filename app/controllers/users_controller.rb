class UsersController < ApplicationController
  def index
    render json: User.search(params[:search])
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)
    newPassword = Devise.friendly_token.first 8
    user.password = newPassword

    if user.save
      render json: { id: user.id, email: user.email, password: newPassword}
    else
      render json: {errors: user.errors.full_messages}, status: 500
    end
  end

  def update
    user = User.find(params[:id])

    new_params = user_params.to_h
    if new_params['password'].present?
      user.update(user_params)
    else
      new_params.delete "password"
      user.update(new_params)
    end

    if user.errors.none?
      render json: { id: user.id, email: user.email }
    else
      render json: {errors: user.errors.full_messages}, status: 500
    end
  end

  def destroy
    user = User.find(params[:id])

    if user.delete!
      render status: :ok
    else
      render json: { errors: user.errors.full_messages}, status: 500
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
