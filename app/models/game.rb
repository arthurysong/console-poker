class Game < ApplicationRecord
    belongs_to :room
    has_many :users
    has_many :rounds

    def as_json(options = {})
        super(only: [:id], methods: [:active_round])
        # super(only: [:id])
    end 

    def active_round
        self.rounds.last
    end

    def start
        self.rounds.build.tap do |new_round|
            new_round.save
            new_round.start
        end
    end
end
