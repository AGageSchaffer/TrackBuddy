class FavoritesController < ApplicationController
    def index
        render json: @current_user.favorites, status: :ok
    end

    def create 
        favoriteTrack = Favorite.create!(favoriteTrack_params)
        render json: favoriteTrack, status: :created
    end

    def destroy 
        track = set_favorite
        track.destroy
        head :no_content
    end

    private

    def favoriteTrack_params
        params.permit(:id, :racetrack_id, :user_id)
    end

    def set_favorite
        Favorite.find(params[:id])
    end
end
