class AuthenticationController < ApplicationController
    skip_before_action :authenticate_request

    # def test
    #     render json: { test: 'hi' }
    # end

    def authenticate
        command = AuthenticateUser.call(user_params[:email], user_params[:password])
        if command.success?
            render json: { auth_token: command.result[:token], user: command.result[:user] }
        else
            render json: { error: command.errors }, status: unauthorized
        end
    end

    def set_login
        puts 'hello??'
        puts request.headers['Authorization']
        puts request.headers['Authorization'].split(' ').last
        puts JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.secrets.secret_key_base)
        puts JsonWebToken.decode(request.headers['Authorization'].split(' ').last)[0]
        puts JsonWebToken.decode(request.headers['Authorization'].split(' ').last)[0][0]

        puts 'decoded', JsonWebToken.decode(request.headers['Authorization'].split(' ').last)
        @current_user = AuthorizeApiRequest.call(request.headers).result
        # puts 'wtf'
        if @current_user 
            render json: { user: @current_user }
        else
            render json: { error: 'Not Authorized' }, status: 401
        end
        # render json: { error: 'Not Authorized' }, status: 401 unless @current_user
        # render json: { user: @current_user }
    end

    def user_params
        params.permit(:email, :password)
    end
end
