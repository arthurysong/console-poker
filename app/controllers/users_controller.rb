require 'pry'

class UsersController < ApplicationController
    skip_before_action :authenticate_request, only: :create

    def index
        users = User.all
        render json: users
    end

    def create
        user = User.new(user_params)
        
        if user.save
            render json: { user: user }, status: 201
        else 
            render json: { errors: user.errors.full_messages }, status: 400
        end
        
        # binding.pry
    end

    def make_move
        game = current_user.game

        old_status = game.status        
        current_user.make_move(params["command"])
        new_status_messages = game.status[old_status.length..game.status.length-1]

        ActionCable.server.broadcast("game_#{game.id}", { type: "update_status", new_status_messages: new_status_messages })
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
end
