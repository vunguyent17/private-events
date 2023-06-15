# frozen_string_literal: true

class ProfilesController < ApplicationController  
  def show
    @profile = User.find_by(username: params[:username]) or not_found
    @events_host_filter = "all"
    @events_invited_filter = "all"
    if (params[:eventFilter])
      filter = params[:eventFilter].split("-")
      if (filter[0]== "host")
        @events_host_filter = filter[1]
      else
        @events_invited_filter = filter[1]
      end
    end
  end

  private
  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end
end