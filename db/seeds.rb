# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# puts 'hello'
room = Room.create(name: 'PakkFlow')
room2 = Room.create(name: 'Omegacucks')
# puts 'hello1'
# puts 'hello123'
users = User.create([
    {username: 'sona', email: 'sona@gmail.com', password: '123456',  room_id: room.id },
    {username: 'toxicflower', email: 'toxicflower@gmail.com', password: '123456', room_id: room.id },
    {username: 'phoenixgold', email: 'phoenixgold@gmail.com', password: '123456', room_id: room.id },
    {username: 'fudge', email: 'fudge@gmail.com', password: '123456', room_id: room.id },
    {username: 'bulldog', email: 'bulldog@gmail.com', password: '123456', room_id: room2.id },
    {username: 'raeyei', email: 'raeyei@gmail.com', password: '123456', room_id: room2.id },
    {username: 'lacari', email: 'lacari@gmail.com', password: '123456', room_id: room2.id },
    {username: 'arch', email: 'arch@gmail.com', password: '123456', room_id: room2.id },
    {username: 'drunkenmonkey', email: 'drunkenmonkey@gmail.com', password: '123456', room_id: room2.id },
    {username: 'warlord', email: 'warlord@gmail.com', password: '123456', room_id: room2.id },
    {username: 'laden', email: 'laden@gmail.com', password: '123456', room_id: room2.id },
    {username: 'bruceu', email: 'bruceu@gmail.com', password: '123456', room_id: room2.id }
])

# puts 'hello2'
chatbox = Chatbox.create(room_id: room.id)
chatbox2 = Chatbox.create(room_id: room2.id)
# puts 'hello3'
messages = Message.create([
    {chatbox: chatbox, user: users[0], payload: "what's up guys?"},
    {chatbox: chatbox, user: users[1], payload: "yo what up, how you been??"},
    {chatbox: chatbox, user: users[2], payload: "hey guys, wanna play some cs or the forest?"},
    {chatbox: chatbox, user: users[2], payload: "i heard it's pretty good"},
    {chatbox: chatbox, user: users[3], payload: "supppp, i'm down for the forest"}
])
