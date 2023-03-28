class PostsController < ApplicationController
    skip_before_action :authorize

    def index
        render json: Post.all, status: :ok
    end

    def create 
        post = Post.create!(post_params)
        render json: post, status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update(post_params)
        render json: post, status: :accepted
    end

    def timecard
        post = Post.create!(params[0])
        timecard = params[1]
        timecard.post_id = post.id
        timescore = Timescore.create!(timecard)
        render json: post, status: :accepted
    end

    def destroy 
        post = set_post
        post.destroy
        head :no_content
    end

    private

    def post_params
        params.permit(:id, :user_id, :racetrack_id, :body)
    end

    def set_post
        Post.find(params[:id])
    end

end
