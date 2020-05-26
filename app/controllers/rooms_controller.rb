class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: { rooms: rooms }
    end
end
