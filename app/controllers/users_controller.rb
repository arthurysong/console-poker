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
        current_user
        # binding.pry
        current_user.make_move(params["command"])
        # here I need to rebroadcast the game to subscribers.
        # binding.pry
        game = current_user.game
        ActionCable.server.broadcast("game_#{game.id}", { type: "current_game_status", status: game.active_round.status })
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email)
    end
end
