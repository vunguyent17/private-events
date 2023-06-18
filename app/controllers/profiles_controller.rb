# frozen_string_literal: true

class ProfilesController < ApplicationController  
  def show

    @profile = User.find_by(username: params[:username]) or not_found
    event_params = allowed_event_params

    if turbo_frame_request?
      puts "Here"
      if event_params[:hosted_filter].present?
        render partial: "profiles/event_frame", locals: {events: @profile.events.send(event_params[:hosted_filter]), frame_name: "events-hosted" }
      else
        render partial: "profiles/event_frame", locals: {events: @profile.invited_events.send(event_params[:invited_filter]), frame_name: "events-invited" }
      end
    else
      render :show
    end
  end

  private
  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def allowed_event_params
    params.permit(:hosted_filter, :invited_filter, :username)
  end
end