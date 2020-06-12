class User < ApplicationRecord
    has_secure_password
    belongs_to :room, optional: true

    belongs_to :game, optional: true
    belongs_to :round, optional: true

    #round_bet
    #chips
    #playing
    #cards
    #total_bet

    def is_move_valid?
        self.round && self.round.turn == self
    end

    def make_move(move, amount = 0, blinds = false)
        # binding.pry
        if is_move_valid?
            self.round.make_player_move(move, amount, blinds)
        end
    end
end
