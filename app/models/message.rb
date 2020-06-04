class Message < ApplicationRecord
    belongs_to :chatbox
    belongs_to :user

    def user_name
        self.user.username
    end

    # def as_json(options = {})
    #     super(only: [:payload], methods: [:user_name])
    # end 
end
