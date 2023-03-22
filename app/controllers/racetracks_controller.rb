class RacetracksController < ApplicationController
    skip_before_action :authorize

    def index
        render json: Racetrack.all, status: :ok
    end
    
end
