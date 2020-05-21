class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request

    # def test
    #     render json: { test: 'hi' }
    # end

    def authenticate
        puts 'test'
        puts params
        command = AuthenticateUser.call(user_params[:email], user_params[:password])

        if command.success?
            render json: { auth_token: command.result }
        else
            render json: { error: command.errors }, status: unauthorized
        end
    end

    def user_params
        params.permit(:email, :password)
    end
end
