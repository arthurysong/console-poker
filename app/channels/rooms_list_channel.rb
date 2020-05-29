require 'pry'

class RoomsListChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # puts 'hello, i subscribed'
    stream_from 'rooms'

    rooms = Room.all
    ActionCable.server.broadcast('rooms', { type: "update_rooms", rooms: rooms })
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # when i receive data from consumer subscription
  def receive(data)
    # puts data
    # binding.pry
    r = Room.create(data.message)
    rooms = Room.all
    
    ActionCable.server.broadcast('rooms', { type: "update_rooms", rooms: rooms }) #I could put my broadcast statement in my controller?
  end
end
