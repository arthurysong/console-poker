require 'pry'

class RoomChannel < ApplicationCable::Channel
  #self.connection.current_user points to current user of connection
  attr_accessor :room
  def subscribed
    stream_from "room_#{params["room"]}"
    # binding.pry
    # room = Room.find(params["room"])
    # ActionCable.server.broadcast("room_#{room.id}", { type: "set_room", room: room })
    # when user subscribes
    # i need to add the current_user to room.users
    # then i need to rebroadcast the list of users to all streamers
    @room = Room.find(params["room"])
    @room.users << self.connection.current_user

    ActionCable.server.broadcast("room_#{room.id}", { type: "current_room", room: @room })
  end

  def create_message(data)
    puts data
    
    # message = Message.create(content: data["content"])
    
    ActionCable.server.broadcast("messages", {type: "new_message", message: message})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    # puts params
    # puts 'in unsubscribed'
    # I need to remove current_user from room.users
    # need to rebroadcast so other people's list of users is updated
    @room.users.delete(self.connection.current_user)
    ActionCable.server.broadcast("room_#{room.id}", { type: "current_room", room: @room })
    stop_all_streams
  end
end
