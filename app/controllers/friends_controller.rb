class FriendsController < ApplicationController
    # skip_before_action :authorize
    def index
        render json: Friend.all.where(friendee_id: @current_user.id), status: :ok
    end

    def create 
        friend = Friend.create!(friend_params)
        render json: friend, status: :created
    end

    def destroy 
        friend = Friend.all.find_by(id: friend_params[:id])
        friend.destroy
        head :no_content
    end

    private

    def friend_params
        params.permit(:id, :friendee_id, :friender_id)
    end

end
