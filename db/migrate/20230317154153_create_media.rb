class CreateMedia < ActiveRecord::Migration[6.1]
  def change
    create_table :media do |t|
      t.integer :post_id
      t.string :name
      t.string :src

      t.timestamps
    end
  end
end
