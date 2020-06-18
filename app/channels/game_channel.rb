class GameChannel < ApplicationCable::Channel
  attr_accessor :game, :user
  def subscribed
    # stream_from "some_channel"
    # I need to make sure a game gets created when room gets created?
    @game = Game.find(params["game"])

    stream_from "game_#{}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
