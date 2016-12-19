helpers do
  def current_user
    find_by[id: session[:user_id]]
  end

  def logged_in?
    # Even though this isn't a boolean expression, is the name okay?
    current_user
  end
end
