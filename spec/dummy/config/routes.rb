Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  mount SessionTimeoutPrompter::Engine, at: "/session_timeout_prompter"

  root to: 'pages#login'

  controller :pages do
    get :timeout_5_warning_3
  end
end
