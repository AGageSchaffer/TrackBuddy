class Post < ApplicationRecord
    belongs_to :racetrack
    belongs_to :user
    has_many :likes
end
