# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts 'hello'
room = Room.create(name: 'PakkFlow')
puts 'hello1'
User.create(username: 'sona', password: '123456', room: room)
puts 'hello123'
users = User.create([
    {username: 'sona', password: '123456',  room: room },
    {username: 'toxicflower', password: '123456', room: room },
    {username: 'phoenixgold', password: '123456', room: room },
    {username: 'fudge', password: '123456', room: room }
])
puts 'hello2'
chatbox = Chatbox.create(room: room)
puts 'hello3'
messages = Message.create([
    {chatbox: chatbox, user: users[0], payload: "what's up guys?"},
    {chatbox: chatbox, user: users[1], payload: "yo what up, how you been??"},
    {chatbox: chatbox, user: users[2], payload: "hey guys, wanna play some cs or the forest?"},
    {chatbox: chatbox, user: users[2], payload: "i heard it's pretty good"},
    {chatbox: chatbox, user: users[3], payload: "supppp, i'm down for the forest"}
])
