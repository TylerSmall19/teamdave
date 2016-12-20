get '/lobbies' do
  @lobbies = Lobby.all
  erb :'/lobbies/index'
end

get '/lobbies/:id' do
  lobby = Lobby.find_by(id: params[:id])

end

get '/lobbies/:id/games/:game_id' do

  lobby = Lobby.find_by(id: params[:id])

  if lobby && session[:user_id]
    @game = lobby.game
    erb :'/games/show'
  else
    redirect '/'
  end
end

post '/lobbies' do
  lobby = Lobby.create(
    owner_id: session[:user_id],
    name: params[:name]
  )

  redirect "/lobbies/#{lobby.id}"
end
