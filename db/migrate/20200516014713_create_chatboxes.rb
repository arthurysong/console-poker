class CreateChatboxes < ActiveRecord::Migration[6.0]
  def change
    create_table :chatboxes do |t|

      t.timestamps
    end
  end
end
