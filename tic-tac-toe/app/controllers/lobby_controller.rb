get '/lobbies' do
  session[:active_game_id] = nil
  authorized do
    @lobbies = Lobby.all
    erb :'/lobbies/index'
  end
end

get '/lobbies/new' do
  if request.xhr?
    erb :'/lobbies/_new', layout: false
  end
end

get '/lobbies/:id' do
  authorized do
    @lobby = Lobby.find_by(id: params[:id])

    erb :'/lobbies/_show'
  end
end

get '/lobbies/:id/games/:game_id' do

  lobby = Lobby.find_by(id: params[:id])
  session[:active_game_id] = lobby.game.id

  if lobby
    authorized do
      @game = lobby.game
      erb :'/games/show'
    end
  end
end

put '/lobbies/:id/games/:game_id' do
  if request.xhr?
    Game.find_by(id: params[:game_id])
    .winner_id = params[:winner][:id]

    content_type :json
    { winner_name: winner.name }.to_json
  end
end

post '/lobbies' do
  if logged_in? && current_user
    lobby = Lobby.new(
      owner: current_user,
      name: params[:name]
    )

    if lobby.save
      game = Game.create(lobby: lobby)
      # round = game.rounds.create(player: current_user, )
      url = "/lobbies/#{lobby.id}/games/#{lobby.game.id}"

      session[:active_game_id] = lobby.game.id

      if request.xhr?
        content_type :json
        {redirect: true, url: url}.to_json
      else
        redirect url
      end
    else
      status 422
      if request.xhr?
        erb :'/lobbies/new', layout: false
      else

      end
    end
  end
end
