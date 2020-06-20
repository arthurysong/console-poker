require 'pry'

class GameChannel < ApplicationCable::Channel
  attr_accessor :game, :user
  def subscribed
    # stream_from "some_channel"
    # I need to make sure a game gets created when room gets created?
    @user = find_verified_user
    @game = Game.find(params["game"])
    # binding.pry
    stream_from "game_#{@game.id}"

    ActionCable.server.broadcast("game_#{@game.id}", { type: "current_game", game: @game })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
