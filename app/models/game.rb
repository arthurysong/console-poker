class Game < ApplicationRecord
    belongs_to :room
    has_many :players, foreign_key: "game_id", class_name: "User"
    has_many :rounds
end
