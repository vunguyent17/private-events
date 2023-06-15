# frozen_string_literal: true

class EventAttending < ApplicationRecord
  belongs_to :guest, class_name: "User"
  belongs_to :event_with_guest, class_name: "Event"
end
