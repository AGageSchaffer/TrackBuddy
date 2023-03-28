class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :firstName, :lastName, :racecars
end
