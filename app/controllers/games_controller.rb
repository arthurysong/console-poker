class GamesController < ApplicationController
    def show
        if params[:room_id]
            room = Room.find(params[:room_id])
            if room.game?
                render json: room.game
            else
                render json: { error: "Game has not been started."}
            end
        end
    end
end
