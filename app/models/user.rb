class User < ApplicationRecord
    has_secure_password
    has_many :attendinglists
    has_many :favorites
    has_many :messages
    has_many :posts
    has_many :likes
    has_many :friends, foreign_key: :friendee_id
    has_many :frienders, through: :friends
    has_many :friends, foreign_key: :friender_id
    has_many :friendees, through: :friends
    has_many :racecars
    has_many :events, through: :attendinglists
    has_many :timescores, through: :posts
    has_many :media, through: :posts
    has_many :racetracks, through: :favorites
end
