class CreateTimescores < ActiveRecord::Migration[6.1]
  def change
    create_table :timescores do |t|
      t.integer :post_id
      t.string :time
      t.string :timeOfDay
      t.date :date
      t.integer :temperature
      t.string :weather
      t.string :conditions
      t.timestamps
    end
  end
end
