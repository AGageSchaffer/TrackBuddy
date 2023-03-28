class FriendsController < ApplicationController
    # skip_before_action :authorize
    def index
        render json: Friend.all.where(friendee_id: @current_user.id), status: :ok
    end

    def create 
        post = Post.create!(post_params)
        render json: post, status: :created
    end

    def destroy 
        friend = Friend.all.find_by(id: post_params[:id])
        friend.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:id, :friendee_id, :friender_id)
    end

end
