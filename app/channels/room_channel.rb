require 'pry'

class RoomChannel < ApplicationCable::Channel
  #self.connection.current_user points to current user of connection
  def subscribed
    stream_from "room_#{params["room"]}"
    # binding.pry
    # room = Room.find(params["room"])
    # ActionCable.server.broadcast("room_#{room.id}", { type: "set_room", room: room })
  end

  def create_message(data)
    puts data

    # message = Message.create(content: data["content"])
    
    ActionCable.server.broadcast("messages", {type: "new_message", message: message})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    puts params
    puts 'in unsubscribed'
    stop_all_streams
  end
end
