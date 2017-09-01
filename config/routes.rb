SessionTimeoutPrompter::Engine.routes.draw do

  #get :session_timeout_prompter_log_in_again

  resources :server_pings, only: [:create]
  resources :sessions,     only: [:new]

end
