class CreateChatboxes < ActiveRecord::Migration[6.0]
  def change
    create_table :chatboxes do |t|
      t.integer :room_id
      t.timestamps
    end
  end
end
