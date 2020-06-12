require 'pry'

class RoomChannel < ApplicationCable::Channel
  attr_accessor :room, :user
  
  def subscribed
    stream_from "room_#{params["room"]}"
    @room = Room.find(params["room"])
    @user = self.connection.current_user
    @room.users << @user
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })
  end

  def create_message(data)
    puts data
    
    m = Message.create(payload: data["content"], user: self.connection.current_user, chatbox: @room.chatbox)
    
    ActionCable.server.broadcast("room_#{@room.id}", {type: "new_message", message: m})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    @room.users.delete(self.connection.current_user)
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })
    stop_all_streams
  end
end
