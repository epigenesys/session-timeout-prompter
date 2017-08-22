Rails.application.routes.draw do


  #get :session_timeout_prompter_log_in_again

  namespace :session_timeout_prompter do
    resources :server_pings, only: [:create]
    resources :sessions,     only: [:new]
  end

end
