class RacecarSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :year, :make, :model, :trim, :transmission, :mod_list, :photo_src
end
