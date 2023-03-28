class TimescoreSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :time, :timeOfDay, :date, :temperature, :weather, :conditions, :post
end
