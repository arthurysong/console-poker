Rails.application.routes.draw do
  resources :messages
  resources :chatboxes
  resources :rooms
  resources :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/authenticate', to: 'authentication#authenticate'
  get '/test', to: 'authentication#test'
  get '/set_login', to: 'authentication#set_login'
end
