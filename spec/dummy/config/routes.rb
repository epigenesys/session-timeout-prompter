Rails.application.routes.draw do
  mount SessionTimeoutPrompter::Engine, at: "/session_timeout_prompter"

  root to: 'pages#login'

  controller :pages do
    get :timeout_5_warning_3
  end

end
