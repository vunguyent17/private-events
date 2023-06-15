# frozen_string_literal: true

class Event < ApplicationRecord
  has_many :event_attendings, foreign_key: :event_with_guest_id
  has_many :guests, through: :event_attendings
  belongs_to :host, class_name: "User"

  scope :incoming, -> { where('start_time > now()') }
  scope :overdue, -> { where('start_time < now()') }

  validates_comparison_of :start_time, less_than: :end_time
end
