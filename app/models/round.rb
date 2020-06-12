require 'pry'

class Round < ApplicationRecord
    belongs_to :game
    has_many :players, foreign_key: "round_id", class_name: "User"

    #phase
    #small_blind_index
    #turn_index
    #pot
    #highest_bet_for_phase
    #is_playing
    #no_players_for_phase
    #turn_count
    #community_cards
    #all_in

    PRE_FLOP = 0
    FLOP = 1
    TURN = 2
    RIVER = 3

    SMALL_BLIND = 200
    BIG_BLIND = 400

    def turn 
        active_players[self.turn_index]
    end

    def active_players
        self.players.select {|player| player.playing }
    end

    def access_community_cards
        if self.phase == PRE_FLOP
            return ""
        elsif self.phase == FLOP
            return self.community_cards[0..7]
        elsif self.phase == TURN
            return self.community_cards[0..10]
        else
            return self.community_cards
        end
    end

    def phase_finished?
        players_have_bet? && @turn_count > @no_of_players_for_phase
    end

    def start
        self.game.players.each do |player| 
            player.playing = true 
            player.round_id = self.id
            # player.total_bet = 0
            player.round_bet = 0
            player.save
        end

        self.is_playing = true
        self.save

        set_cards
        start_betting_round
    end

    def set_cards
        deck = []
        ['c', 'd', 'h', 's'].each do |color|
            [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'].each do |number|
                deck << number.to_s + color
            end
        end

        community_cards = []
        5.times do 
            c = deck.delete_at(Random.rand(deck.length))
            community_cards << c
        end

        self.community_cards = community_cards.join(' ')
        self.save

        #deal cards to players
        self.players.each do |player|
            cards = []
            2.times do 
                c = deck.delete_at(Random.rand(deck.length))
                cards << c
            end
            player.cards = cards.join(' ')
            player.save
        end
    end

    def start_betting_round
        self.active_players.each do |player| 
            player.round_bet = 0
            player.save
        end 
        self.no_players_for_phase = active_players.count
        self.highest_bet_for_phase = 0
        self.turn_index = self.small_blind_index
        
        self.turn_count = 1

        # if self.phase == 0
        #     self.turn.make_move('raise', SMALL_BLIND, true) # put in blinds for preflop round
        #     self.turn.make_move('raise', BIG_BLIND, true) # put in blinds for preflop round
        # end

        self.save
    end

    def next_turn(blinds = false)
        if self.turn_index < active_players.count-1
            self.turn_index += 1
        else
            self.turn_index = 0
        end

        self.turn_count += 1 unless blinds
    end

    def make_player_move(command, amount = 0, blinds = false)
        if command == "fold"
            folding_player = turn
            folding_player.playing = false
            folding_player.save

            if self.turn_index == self.active_players.count # if last person folds, i need to set index to first person
                self.turn_index = 0
            end
            
            self.turn_count += 1
            self.save
        elsif command == "check"
            # add check
            if self.highest_bet_for_phase == 0
                next_turn
                self.save
            end
        elsif command == "call"
            money_to_leave_player = self.highest_bet_for_phase - turn.round_bet
            turn.round_bet = self.highest_bet_for_phase
            turn.chips -= money_to_leave_player
            self.all_in = true if turn.chips == 0
            self.pot += money_to_leave_player
            turn.save

            #increment turn index
            next_turn
            self.save

        elsif command == "raise"
            puts 'hi'
            if can_players_afford?(amount) && amount > self.highest_bet_for_phase
                puts '2'
                money_to_leave_player = amount - turn.round_bet
                turn.round_bet = amount
                turn.chips -= money_to_leave_player
                self.all_in = true if turn.chips == 0
                turn.save
                self.pot += money_to_leave_player
                self.highest_bet_for_phase = amount
                next_turn(blinds)
                self.save
                binding.pry
            end
        elsif command == "allin"
            turn.make_move('raise', max_raise_level)
        end
        
        if check_if_over
            end_game_by_fold
        elsif players_have_bet? && self.turn_count > self.no_players_for_phase
            initiate_next_phase
        end
    end

    def max_raise_level
        max = 0
        active_players.each_with_index do |player, index|
            player_max = player.chips + player.round_bet
            max = player_max if player_max < max || index == 0
        end
        max
    end

    def can_players_afford?(amount)
        self.active_players.each do |player|
            money_to_leave_player = amount - player.round_bet
            if player.chips < money_to_leave_player
                return false
            end
        end
        true
    end

    def initiate_next_phase
        # or if all in, just go to showdown
        if all_in || self.phase == 3 
            showdown
        else
            self.phase += 1
            #show another card
            start_betting_round
        end
    end

    def showdown
        best_hands = []
        best_players = []
        active_players.each_with_index do |player, index|

            hand = Holdem::PokerHand.new(player.cards + " " + self.access_community_cards)
            if index == 0 || hand == best_hands[0]
                best_hands << hand
                best_players << player
            elsif hand > best_hands[0]
                best_hands = [hand]
                best_players = [player]
            end
        end

        split = self.pot / best_players.count
        best_players.each do |player|
            player.chips += split
            player.save
        end

        self.is_playing = false
        self.save
    end

    def players_have_bet?
        #check all players self.current_bet to be equal to highest bet
        self.active_players.each do |player|
            if player.round_bet < self.highest_bet_for_phase
                return false
            end
        end
        true
    end

    def end_game_by_fold
        #set is playing to false
        #give pot to last active player
        self.is_playing = false
        self.save

        last_player = self.active_players[0]
        last_player.chips += self.pot
        last_player.save
    end

    def check_if_over
        self.active_players.count == 1
    end
end
