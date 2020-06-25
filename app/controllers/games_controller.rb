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
        if !game.active_round.is_playing
            game.start
            game.save

            ActionCable.server.broadcast("game_#{game.id}", { type: "set_game", game: game })
        else
            ActionCable.server.broadcast("game_#{game.id}", { type: "errors", error: "Round is still playing." })
        end

        

        render json: game
    end
end
