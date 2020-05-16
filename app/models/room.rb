class Room < ApplicationRecord
    has_many :users
    has_one :chatbox
end
