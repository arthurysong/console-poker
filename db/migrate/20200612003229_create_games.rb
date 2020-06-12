class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :room_id
      
      t.timestamps
    end
  end
end
