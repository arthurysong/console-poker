class Game < ApplicationRecord
    belongs_to :room
    has_many :users
    has_many :rounds

    def as_json(options = {})
        super(only: [:id], methods: [:active_round], include: [:users])
        # super(only: [:id])
    end 

    def active_round
        self.rounds.last
    end

    def start
        new_index = 0
        if self.active_round
            last_blind_index = self.active_round.small_blind_index
            new_index = (last_blind_index + 1) % self.users.count
        end

        self.rounds.build(small_blind_index: new_index).tap do |new_round|
            new_round.save
            new_round.start
        end
    end
end
