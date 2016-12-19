get '/users/new' do
  # Serving partials with instance variables might not be the best, but it's easier for now.
  @errors = nil
  if request.xhr?
    erb :'/users/_new', layout: false
  else
    erb :'/users/_new'
  end
end

post '/users' do
  user = User.new(params[:user])
  if user.save
    session[:user_id] = user.id
    if request.xhr?
      # It's set implicitly, I know. I just want the practice with status codes.
      status 200
      content_type :json
      { redirect: true, url: '/lobbies' }.to_json
    else
      redirect '/lobbies'
    end
  else
    @errors = user.errors.full_messages
    status 422
    if request.xhr?
      erb :'/users/_new', layout: false
    else
      erb :'/users/_new'
    end
  end
end
