class RacetrackSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :state, :city, :length, :style
end
