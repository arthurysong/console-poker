class Room < ApplicationRecord
    has_many :users
    has_one :chatbox
    has_many :messages, through: :chatbox
    has_one :game

    def as_json(options = {})
        super(only: [:name, :id, :messages], methods: [:no_users], include: [:messages, :users])
    end 

    def no_users
        self.users.count
    end
end
