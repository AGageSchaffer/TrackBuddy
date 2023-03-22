class CreateAttendinglists < ActiveRecord::Migration[6.1]
  def change
    create_table :attendinglists do |t|
      t.integer :event_id
      t.integer :user_id

      t.timestamps
    end
  end
end
