User.create(username: 'tyler', email: 'tyler@tyler.com', password: 'password')

User.first.lobbies.create(name: 'Test Game!')

Game.create(lobby: Lobby.first)
