class Room < ApplicationRecord
    has_many :users
    has_one :chatbox

    def as_json(options = {})
        super(only: [:name], methods: [:no_users])
    end 

    def no_users
        self.users.count
    end
end
