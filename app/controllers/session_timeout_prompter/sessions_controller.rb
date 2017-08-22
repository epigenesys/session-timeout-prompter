module SessionTimeoutPrompter
  class SessionsController < ActionController::Base

    # We arrive here when clicking "Log in again"
    # Note: Due to inherent inaccuracies in javascript timing it is a good idea to
    # override this in your app and destroy the user session to make sure they are
    # actually logged out as this may cause confusion.
    def new
      redirect_to main_app.root_path
    end

  end
end
