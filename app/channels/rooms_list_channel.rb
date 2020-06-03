require 'pry'

class RoomsListChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    # puts 'hello, i subscribed'
    stream_from 'rooms'

    rooms = Room.all
    ActionCable.server.broadcast('rooms', { type: 'current_rooms', rooms: rooms })
  end

  def unsubscribed
    stop_all_streams
  end

  def receive(data)
  end

  def create_room(state)
    r = Room.create(name: state["name"])

    ActionCable.server.broadcast('rooms', { type: 'new_room', room: r }) #I could put my broadcast statement in my controller?
  end
end


