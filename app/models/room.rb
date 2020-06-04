class Room < ApplicationRecord
    has_many :users
    has_one :chatbox
    has_many :messages, through: :chatbox

    def as_json(options = {})
        super(only: [:name, :id], methods: [:no_users], include: [{messages: {only: [:payload], methods: [:user_name]}}, :users])
    end 

    def no_users
        self.users.count
    end
end
