class GamesController < ApplicationController
    def index
        if params[:room_id]
            room = Room.find(params[:room_id])
            if room.game
                render json: room.game
            else
                render json: { error: "Game has not been started."}
            end
        end
    end
    
    def start
        game = Game.find(params[:id])
        game.start
        game.save

        ActionCable.server.broadcast("game_#{game.id}", { type: "set_game", game: game })

        render json: game
    end
end
