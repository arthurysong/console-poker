require 'pry'

class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_#{params["room"]}"

    room = Room.find(params["room"])
    ActionCable.server.broadcast("room_#{room.id}", room )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
end
