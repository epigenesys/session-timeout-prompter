module SessionTimeoutPrompter
  module PromptHelper

    # timeout_in:  The session timeout length set for your app
    #              (most often from User.timeout_in if using Devise)
    #
    # scope:       e.g. :user - most often the name of the Devise scope/model
    #
    # session_key: Unique key for this app and scope - used to enable multi-tab support
    def session_timeout_prompter(timeout_in:, scope:)
      render(
        partial: "/session_timeout_prompter/modal_dialogs",
        locals: {
          container_data_attributes: {
            server_ping_path: session_timeout_prompter_server_pings_path,
            timeout_in:       timeout_in,
            session_key:      "#{Rails.application.class.parent_name.downcase}-#{scope}"
          }
        }
      )
    end

  end
end
