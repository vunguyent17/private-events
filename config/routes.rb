Rails.application.routes.draw do
  root "events#index"

  devise_for :users, 
  path: 'auth', 
  path_names: {
     sign_in: 'login',
     sign_out: 'logout',
     password: 'secret',
     confirmation: 'verification',
     unlock: 'unblock',
     registration: 'register',
     sign_up: 'signup' 
    },
    controllers: {
        sessions: 'users/sessions',
        registrations: 'users/registrations' }
        
  resources :events
  post 'events/:id/guests', to: 'events#add_guest', as: :add_guest
  delete 'events/:id/guests', to: 'events#remove_guest', as: :remove_guest
  get 'profiles/:username', to: 'profiles#show', as: :show_profile
  get '/404', to: 'errors#not_found'
  get '/500', to: 'errors#internal_server'
  get '/422', to: 'errors#unprocessable'
end
