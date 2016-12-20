get '/lobbies' do
  @lobbies = Lobby.all
  erb :'/lobbies/index'
end

# Previous I had it as /lobbies/:id/games/:game_id, but I think this is better
get '/lobbies/:id/game' do
  lobby = Lobby.find_by(id: params[:id])

  if lobby && session[:user_id]
    @game = lobby.game
    erb :'/games/show'
  else
    redirect '/'
  end
end
