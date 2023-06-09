class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :destroy, :index]

    def index
      render json: User.all, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
          render json: user, status: :ok
        else
          render json: { error: "Not authorized" }, status: :unauthorized
        end
      end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def destroy
        User.destroy_all
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :firstName, :lastName)
    end

end
