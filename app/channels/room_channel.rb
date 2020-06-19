require 'pry'

class RoomChannel < ApplicationCable::Channel
  attr_accessor :room, :user
  
  def subscribed
    stream_from "room_#{params["room"]}"
    @user = find_verified_user
    @room = Room.find(params["room"])
    @room.users << @user
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })

    #need to rebroadcast this to all roomlist subscribers because number of users of a room will change.
    rooms = Room.all
    ActionCable.server.broadcast("rooms", { type: "current_rooms", rooms: rooms }) 
  end

  def create_message(data)
    m = Message.create(payload: data["content"], user: @user, chatbox: @room.chatbox)
    
    ActionCable.server.broadcast("room_#{@room.id}", {type: "new_message", message: m})
  end

  def unsubscribed
    puts "I UNSUBSCRIBED!!"
    @room.users.delete(@user)
    @user.save

    ActionCable.server.broadcast("room_#{@room.id}", { type: "current_room", room: @room })
    stop_all_streams
  end
end
