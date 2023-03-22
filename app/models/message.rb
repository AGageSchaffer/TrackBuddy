class Message < ApplicationRecord
    belongs_to :friender_id, class_name: "User"
    belongs_to :friendee_id, class_name: "User"

end
