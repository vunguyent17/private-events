class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :username, :email, uniqueness: true
  validates :username, :email, :encrypted_password, presence: true

  has_many :events, foreign_key: :host_id, class_name: "Event"
  has_many :event_attendings, foreign_key: :guest_id
  has_many :event_with_guests, through: :event_attendings

  def invited_events
    Event.includes(:event_attendings).where(event_attendings: { guest_id: self.id })
  end
end
