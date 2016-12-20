class CreateLobbies < ActiveRecord::Migration
  def change
    create_table :lobbies do |t|
      t.integer :owner_id
      t.string :name, null: true

      t.timestamps(null: false)
    end
  end
end
