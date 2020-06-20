require 'pry'

class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: rooms
    end

    def create
        room = Room.create(room_params)

        game = room.game.build
        game.save
        
        render json: room
    end

    private

    def room_params
        params.permit(:name)
    end
end
