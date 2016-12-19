post '/sessions' do
  user = User.find_by(username: params[:username])

  if user && user.validate(params[:password])
    if request.xhr?
      session[:user_id] = user.id
      content_type :json
      { redirect: true, url: '/lobbies' }.to_json
    else
      redirect '/lobbies'
    end
  else
    @errors = ['Invalid Username or Password']
    if request.xhr?
      status 422
      erb :'/sessions/_new', layout: false
    else
      erb :'/sessions/_new'
    end
  end
end

get '/sessions/new' do
  if request.xhr?
    erb :'/sessions/_new', layout: false
  else
    erb :'/sessions/_new'
  end
end
