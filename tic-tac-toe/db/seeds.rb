User.create(username: 'tyler', email: 'tyler@tyler.com', password: 'password')

User.first.lobbies.create(name: 'Test Game!')
User.first.lobbies.create(name: 'Another Test Game!')

Game.create(lobby: Lobby.first)
Game.create(lobby: Lobby.last)
