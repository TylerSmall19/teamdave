post '/sessions' do

end

get '/sessions/new' do
  if request.xhr?
    erb :'/sessions/_new', layout: false
  else
    erb :'/sessions/_new'
  end
end
