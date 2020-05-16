class User < ApplicationRecord
    has_secure_password
    has_one :room
end
