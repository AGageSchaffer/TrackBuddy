class FriendSerializer < ActiveModel::Serializer
  attributes :id, :friender, :friendee
end
