class Game < ActiveRecord::Base
  belongs_to :lobby

  def full?
    player.length >= 2
  end
end
