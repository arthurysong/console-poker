binding.pry

class RoomChannel < ApplicationCable::Channel
  def subscribed(data)
    # stream_from "some_channel"
    stream_from "room_#{params[:content]}"

    puts params
    # puts request

    room = Room.find(params[:data])
    ActionCable.server.broadcast("room_#{room.id}", room )
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
