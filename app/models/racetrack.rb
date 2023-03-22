class Racetrack < ApplicationRecord
    has_many :events
    has_many :favorites
    has_many :posts
    
end
