class RoomsListChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'rooms'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  # when i receive data from consumer subscription
  def receive(data)
    note = Room.find(data["id"])
    note.update!(text: data["text"])
    ActionCable.server.broadcast('rooms', data) #I could put my broadcast statement in my controller?
  end
end
