class Event < ApplicationRecord
    belongs_to :racetrack
    has_many :attendinglists
    has_many :users, through: :attendinglists
end
