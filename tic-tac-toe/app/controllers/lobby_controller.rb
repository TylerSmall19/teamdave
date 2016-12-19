get '/lobbies' do
  @lobbies = Lobby.all
  erb :'/lobbies/index'
end
