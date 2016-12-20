get '/lobbies' do
  @lobbies = Lobby.all
  erb :'/lobbies/index'
end

get '/lobbies/:id' do
  @lobby = Lobby.find_by(id: params[:id])
  erb :'/lobbies/_show'
end

get '/lobbies/:id/games/:game_id' do

  lobby = Lobby.find_by(id: params[:id])

  if lobby && logged_in?
    @game = lobby.game
    erb :'/games/show'
  else
    redirect '/'
  end
end

post '/lobbies' do
  if logged_in? && current_user
    lobby = Lobby.create(
      owner_id: session[:user_id],
      name: params[:name]
    )

    lobby.game = Game.create

    user = User.find_by

    redirect "/lobbies/#{lobby.id}/games/#{game.id}"
  end
end
