class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.boolean :active, default: false
      t.integer :lobby_id, null: false

      t.timestamps(null: false)
    end
  end
end
