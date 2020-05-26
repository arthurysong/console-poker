class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: rooms
    end

    private

    def room_params
        room.permit(:name)
    end
end
