class Lobby < ActiveRecord::Base
  belongs_to :owner, class_name: "User"
  has_one :game
end
