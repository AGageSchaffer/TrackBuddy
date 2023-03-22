class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.integer :sender_id, foreign_key: true
      t.integer :receiver_id, foreign_key: true
      t.string :text

      t.timestamps
    end
  end
end
