module SessionTimeoutPrompter
  class ServerPingsController < ActionController::Base

    # Serves only to reset the user's session timeout on the server side
    def create
      head :ok
    end

  end
end
