helpers do
  def current_user
    User.find_by(id: session[:user_id])
  end

  def logged_in?
    current_user != nil
  end

  def authorized(route = '/')
    if logged_in? && current_user
      yield
    else
      redirect route
    end
  end
end
