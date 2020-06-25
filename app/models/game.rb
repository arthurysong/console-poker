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
        last_blind_index = self.active_round.small_blind_index
        new_index = (last_blind_index == self.users.count - 1 ? 0 : last_blind_index + 1)

        self.rounds.build(small_blind_index: new_index).tap do |new_round|
            new_round.save
            new_round.start
        end
    end
end
