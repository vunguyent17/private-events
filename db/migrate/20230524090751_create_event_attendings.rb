class CreateEventAttendings < ActiveRecord::Migration[7.0]
  def change
    create_table :event_attendings do |t|
      t.integer :guest_id
      t.integer :event_with_guest_id
      
      t.timestamps
    end
  end
end
