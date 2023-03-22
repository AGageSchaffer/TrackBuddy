class CreateFriends < ActiveRecord::Migration[6.1]
  def change
    create_table :friends do |t|
      t.integer :friender_id, foreign_key: true
      t.integer :friendee_id, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
