# frozen_string_literal: true

class EventsController < ApplicationController
  before_action :authenticate_user!, only: %i[new create show edit update delete add_guest remove_guest]

  def index
    @events = Event.all.order(created_at: :desc)
  end

  def show
    @event = Event.find(params[:id]) or not_found
  end

  def new
    @event = Event.new
    search_user_handler()
  end

  def edit
    @event = Event.find(params[:id]) or not_found
    search_user_handler()
  end

  def update
    @event = Event.find(params[:id]) or not_found
    event_params = allowed_event_params
    event_params[:start_time] = modify_datetime(event_params[:start_time].to_datetime , allowed_timezone_params[:time_zone])
    event_params[:end_time] = modify_datetime(event_params[:end_time].to_datetime , allowed_timezone_params[:time_zone])

    respond_to do |format|
      if @event.update(event_params)
        @event.guest_ids = allowed_guest_params[:guest_ids]
        format.html { redirect_to(@event,
                      :notice => 'This event was successfully updated.') }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @event.errors,
                      :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @event = Event.find(params[:id]) or not_found
    @event.destroy
  
    respond_to do |format|
      format.html { redirect_to(events_path) }
      format.xml  { head :ok }
    end
  end

  def create
    @event = current_user.events.build(allowed_event_params)
    if allowed_guest_params[:guest_ids].include?(@event.host.id)
      flash.now[:error] = 'Something\'s wrong. Can\'t create new event. Please check your input'
      render :new, status: :unprocessable_entity
    else
      @event.start_time = modify_datetime(@event.start_time, allowed_timezone_params[:time_zone])
      @event.end_time = modify_datetime(@event.end_time, allowed_timezone_params[:time_zone])
      if @event.save
        @event.guest_ids = allowed_guest_params[:guest_ids]
        flash[:notice] = 'Great! Your event has been created!'
        redirect_to :root
      else
        flash.now[:error] = 'Something\'s wrong. Can\'t create new event. Please check your input'
        render :new, status: :unprocessable_entity
      end
    end
  end

  def add_guest
    @event = Event.find(params[:id])
    if (@event.host.id == current_user.id)
      flash.now[:error] = 'You can\'t be a guest if you are the host of this event.'
      render :new, status: :unprocessable_entity
    elsif @event.guests.include?(current_user)
      flash.now[:error] = 'You have already joined.'
      render :new, status: :unprocessable_entity
    else
      @event.guests << current_user
      respond_to do |format|
        format.html { redirect_to request.referrer, notice: 'Great! You joined this event!' }
      end
    end
  end

  def remove_guest
    @event = Event.find(params[:id])
    if @event.guests.include?(current_user)
      @event.guests.delete(current_user)
      respond_to do |format|
        format.html { redirect_to request.referrer, notice: 'You left this event' }
      end
    else
      flash.now[:error] = 'Something\'s wrong. You are not part of this event.'
      render :new, status: :unprocessable_entity
    end
  end

  private

  def search_user_handler
    search_params = allowed_search_user_params

    if search_params[:query].present?
      @users = User.where('username like ?', "#{search_params[:query]}%").limit(10)
    else
      @users = User.none
    end

    if search_params[:query].present?
      respond_to do |format|
        format.turbo_stream
      end
    end
  end

  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  def allowed_event_params
    params.require(:event).permit(:name, :location, :start_time, :end_time, :note)
  end

  def allowed_timezone_params
    params.require(:event).permit(:time_zone)
  end

  def allowed_guest_params
    params.require(:event).permit(guest_ids: [])
  end

  def allowed_search_user_params
    params.permit(:id, :query, :turbo_frame, :turbo_action)
  end

  def modify_datetime(datetime, time_zone)
    d = datetime
    datetime.in_time_zone(time_zone)
            .change(year: d.year, month: d.month, day: d.day, hour: d.hour, min: d.min, sec: d.sec)
  end
end
