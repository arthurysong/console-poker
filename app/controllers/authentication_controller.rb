class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request
    
    def test
        render json: { test: 'hi' }
    end

    def authenticate
        command = AuthenticateUser.call(params[:email], params[:password])

        if command.success?
            render json: { auth_token: comman.result }
        else
            render json: { error: command.errors }, status: unauthorized
        end
    end
end
