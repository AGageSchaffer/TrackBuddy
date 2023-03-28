class TimescoresController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Timescore.all, status: :ok
    end

    def create 
        timeScore = Timescore.create!(timeScore_params)
        render json: timeScore, status: :created
    end

    def update
        post = Post.find(params[:id])
        post.update(post_params)
        render json: post, status: :accepted
    end

    def destroy 
        timescore = set_timescore
        timescore.destroy
        head :no_content
    end

    private

    def timeScore_params
        params.permit(:id, :post_id, :time, :timeOfDay, :date, :temperature, :weather, :conditions)
    end

    def set_timescore
        Timescore.find(params[:id])
    end

end
