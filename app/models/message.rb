class Message < ApplicationRecord
    belongs_to :chatbox
    belongs_to :user
end
