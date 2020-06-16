class GameChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # I need to make sure a game gets created when room gets created?
    @game = Room.find(params["room"]).game

    stream_from "game_#{}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
