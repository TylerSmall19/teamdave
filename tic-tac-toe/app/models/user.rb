class User < ActiveRecord::Base
  validates :username, :email, presence: true
  validates :email, :username, uniqueness: true

  def password
    @password ||= BCrypt::Password.new(password_hash);
  end

  def password=(new_password)
    @text_password = new_password
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def validate(text_password)
    # Self isn't needed here, but it improves my readability
    self.password == text_password
  end
end
