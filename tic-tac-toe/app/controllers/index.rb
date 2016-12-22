get '/' do
  if logged_in?
    redirect '/lobbies'
  else
    erb :'/index'
  end
end
