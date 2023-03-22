class CreateRacecars < ActiveRecord::Migration[6.1]
  def change
    create_table :racecars do |t|
      t.integer :user_id
      t.integer :year
      t.string :make
      t.string :model
      t.string :trim
      t.string :transmission
      t.string :mod_list
      t.string :photo_src

      t.timestamps
    end
  end
end
