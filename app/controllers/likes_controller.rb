class LikesController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Like.all, status: :ok
    end

    def create 
        like = Like.create!(likes_params)
        render json: like, status: :created
    end

    def destroy 
        like = set_like
        like.destroy
        head :no_content
    end

    private

    def likes_params
        params.permit(:id, :post_id, :user_id)
    end

    def set_like
        Like.find(params[:id])
    end


end
