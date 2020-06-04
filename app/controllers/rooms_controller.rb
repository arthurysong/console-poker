require 'pry'

class RoomsController < ApplicationController
    def index
        rooms = Room.all
        render json: rooms
    end

    # def show
    #     room = Room.find(params[:id])
    #     render json: room
    # end

    # r.users << u to create association
    # r.users.delete(u) to remove association
    # I think this has to be done in channel subscription
    # because i want users to have live list of whos in the channel.
    # def join_room
    #     room = Room.find(params[:id])
        
    #     room.users << @current_user
    #     render json: room
    # end

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
