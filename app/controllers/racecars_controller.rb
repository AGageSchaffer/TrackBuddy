class RacecarsController < ApplicationController

    def index
        render json: @current_user.racecars, status: :ok
    end

    def create 
        racecar = Racecar.create!(racecar_params)
        render json: racecar, status: :created
    end

    def update
        racecar = @current_user.racecars.find(params[:id])
        racecar.update(racecar_params)
        render json: racecar, status: :accepted
    end

    def destroy 
        racecar = set_racecar
        racecar.destroy
        head :no_content
    end

    private

    def racecar_params
        params.permit(:user_id, :year, :make, :model, :trim, :transmission, :mod_list, :photo_src)
    end

    def set_racecar
        Racecar.find(params[:id])
    end


end
