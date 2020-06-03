require 'pry'

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    attr_accessor :current_user

    def connect
      self.current_user = find_verified_user
    end

    private 
      def find_verified_user 
        if current_user = User.find(JWT.decode(request['token'], Rails.application.secrets.secret_key_base)[0]["user_id"])
          current_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
