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
    stop_all_streams
  end

  def receive(data)
  end

  def create_room(state)
    puts 'hello??? in create_room '
    r = Room.create(state["content"])
    rooms = Room.all

    ActionCable.server.broadcast('rooms', { type: "update_rooms", rooms: rooms }) #I could put my broadcast statement in my controller?
  end
end


