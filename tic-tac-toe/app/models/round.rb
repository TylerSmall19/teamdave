class Round < ActiveRecord::Base
  validates :game_id, :player_id, presence: true
  belongs_to :player, class_name: 'User'
  belongs_to :game

  def self.over?
    self.where("winner_id != NULL")
  end
end
