put '/rounds/:id' do
  if request.xhr?
    round = Round.find_by(id: params[:id])
    round.winner_id = params[:winner][:id]

    content_type :json
    { winner_name: round.winner.name }.to_json
  end
end

get '/rounds/:id' do

  round = Round.find_by(id: params[:id])
  session[:active_game_id] = round.game.id

  if round
    authorized do
      @game = round.game
      erb :'/games/show'
    end
  end
end

# I'm aware this isn't RESTful, but I don't have anything else to call it.
post '/rounds/games/:id' do
  if request.xhr?
    round = Game.find_by(id: params[:id]).rounds
    .create(player: current_user)

    content_type :json
    { redirect: true, url: "/rounds/#{round.id}" }.to_json
  else
    redirect back
  end
end
