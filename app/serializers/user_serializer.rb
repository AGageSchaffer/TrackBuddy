class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :firstName, :lastName
end
