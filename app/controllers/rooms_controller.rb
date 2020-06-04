class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: rooms
    end

    def show
        room = Room.find(params[:id])
        render json: room
    end

    def create
        # puts 'hello'
        room = Room.create(room_params)
        puts room
        render json: room
    end

    private

    def room_params
        params.permit(:name)
    end
end
