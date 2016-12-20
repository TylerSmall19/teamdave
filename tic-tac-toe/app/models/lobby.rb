class Lobby < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :owner, class_name: "User"
  has_one :game
end
