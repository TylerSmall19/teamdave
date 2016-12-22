class Round < ActiveRecord::Base
  validates :game_id, :player_id, presence: true
  belongs_to :player, class_name: 'User'
  belongs_to :game
  belongs_to :winner, class_name: 'User'

  def self.over?
    self.where("winner_id != NULL")
  end

  def winner
    User.find_by(id: winner_id)
  end
end
