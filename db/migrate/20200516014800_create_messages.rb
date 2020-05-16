class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :payload
      t.integer :user_id
      t.integer :chatbox_id

      t.timestamps
    end
  end
end
