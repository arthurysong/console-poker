require 'pry'

class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: rooms
    end

    def create
        if room_params[:password] != ""
            room = Room.create(room_params)
        else
            room = Room.create(name: room_params["name"])
        end

        g = Game.create
        g.room = room
        g.save

        render json: room
    end

    def authenticate
        room = Room.find(params["id"])
        if room.authenticate(params["password"])
            render json: room
        else
            render json: { error: "Invalid Password" }, status: 401
        end
    end

    private

    def room_params
        params.permit(:name, :password)
    end
end
