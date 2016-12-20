class Game < ActiveRecord::Base
  belongs_to :lobby

  has_many :players, foreign_key: :active_game_id

  def full?
    player.length >= 2
  end
end
