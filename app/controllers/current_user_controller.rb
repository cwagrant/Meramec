class CurrentUserController < ApplicationController
  # before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:index]

  def index
    if current_user
      render json: current_user, status: :ok
    else
      render json: {message: 'Not Logged In'}, status: :unauthorized
    end
  end
end
