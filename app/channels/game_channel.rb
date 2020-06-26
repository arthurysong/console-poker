require 'pry'

class GameChannel < ApplicationCable::Channel
  def subscribed
    user = find_verified_user
    game = Game.find(params["game"])
    game.users << user
    user.save

    stream_from "game_#{game.id}"

    ActionCable.server.broadcast("game_#{game.id}", { type: "set_game", game: game })
  end

  def unsubscribed
    puts "I AM LEAVING GAME..."
    user = find_verified_user
    game = Game.find(params["game"])

    user.leave_round
    
    game.users.delete(user)
    user.save


    stop_all_streams

    ActionCable.server.broadcast("game_#{game.id}", { type: "set_game", game: game })
  end
end
