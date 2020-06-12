require 'pry'
class User < ApplicationRecord
    has_secure_password
    belongs_to :room, optional: true
    belongs_to :game, inverse_of: 'players', optional: true
    belongs_to :round, inverse_of: 'players', optional: true

    #round_bet
    #chips
    #playing
    #cards
    #total_bet

    def is_move_valid?
        binding.pry
        self.round && self.round.turn == self
    end

    def make_move(move, amount = 0, blinds = false)
        if is_move_valid?
            self.round.make_player_move(move, amount, blinds)
        end
    en
end
