class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.integer :room_id

      #for playing poker
      t.integer :game_id
      t.integer :round_id

      t.boolean :playing
      t.integer :round_bet
      t.integer :chips, :default => 100000
      t.string :cards

      t.timestamps
    end
  end
end
