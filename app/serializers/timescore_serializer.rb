class TimescoreSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :timeOfDay, :date, :temperature, :weather, :conditions
end
