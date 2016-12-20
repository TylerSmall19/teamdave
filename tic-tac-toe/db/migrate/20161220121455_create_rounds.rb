class CreateRounds < ActiveRecord::Migration
  def change
    create_table :rounds do |t|
      t.integer :player_id, null: false
      t.integer :game_id, null: false
      t.integer :winner_id

      t.timestamps(null: false)
    end
  end
end
