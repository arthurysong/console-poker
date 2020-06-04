require 'pry'

class AuthenticationController < ApplicationController
    # skip_before_action :authenticate_request

    def authenticate
        command = AuthenticateUser.call(user_params[:email], user_params[:password])
        if command.success?
            render json: { auth_token: command.result[:token], user: command.result[:user] }
        else
            render json: { errors: command.errors[:user_authentication] }, status: :unauthorized
        end
    end

    def set_login
        if @current_user 
            render json: { user: @current_user }
        end
    end

    def user_params
        params.permit(:email, :password)
    end
end
