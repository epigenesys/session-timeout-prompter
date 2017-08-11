Rails.application.routes.draw do
  mount SessionTimeoutPrompter::Rails::Engine => "/session_timeout_prompter"

  root to: 'pages#home'
end
