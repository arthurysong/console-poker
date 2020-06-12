class Message < ApplicationRecord
    belongs_to :chatbox
    belongs_to :user

    def username
        self.user.username
    end

    def as_json(options = {})
        super(only: [:payload, :created_at], methods: [:username])
    end 
end
