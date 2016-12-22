class Game < ActiveRecord::Base
  belongs_to :lobby
  has_many :rounds
  has_many :players, through: :rounds, class_name: 'User'

  def full?
    player.length >= 2
  end
end
