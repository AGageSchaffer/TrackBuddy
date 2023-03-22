class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.integer :racetrack_id

      t.timestamps
    end
  end
end
