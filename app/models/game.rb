class Game < ApplicationRecord
    belongs_to :room
    has_many :users
    has_many :rounds

    def as_json(options = {})
        super(only: [:id], methods: [:active_round])
    end 

    def active_round
        self.rounds.last
    end

    def start
        self.room.users.each do |user|
            user.game_id = self.id
            user.save
        end

        self.rounds.build.tap do |new_round|
            new_round.save
            new_round.start
        end
    end
end
