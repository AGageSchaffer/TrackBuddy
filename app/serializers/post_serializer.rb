class PostSerializer < ActiveModel::Serializer
  attributes :id, :racetrack_id, :user_id, :body, :user
end
