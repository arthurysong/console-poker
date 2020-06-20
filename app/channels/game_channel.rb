require 'pry'

class GameChannel < ApplicationCable::Channel
  attr_accessor :game, :user
  def subscribed
    @user = find_verified_user
    @game = Game.find(params["game"])
    @game.users << @user
    @user.save

    stream_from "game_#{@game.id}"

    ActionCable.server.broadcast("game_#{@game.id}", { type: "current_game", game: @game })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
