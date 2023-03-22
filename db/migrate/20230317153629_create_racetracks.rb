class CreateRacetracks < ActiveRecord::Migration[6.1]
  def change
    create_table :racetracks do |t|
      t.string :name
      t.string :address
      t.string :state
      t.string :city
      t.integer :zipcode
      t.numeric :length
      t.string :style

      t.timestamps
    end
  end
end
