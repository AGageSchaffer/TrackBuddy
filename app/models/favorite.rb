class Favorite < ApplicationRecord
    belongs_to :user
    belongs_to :racetrack

    def favoriteTracks
        self.favorites.each((favorite) => favorite.racetrack)
    end

end
