module SessionTimeoutPrompter
  module PromptHelper

    # session_timeout_in_seconds: The session timeout length set for your app
    #                             (most often from User.timeout_in.to_i if using Devise)
    #
    # timeout_warning_in_seconds: Show a warning this many seconds before the session times out.
    #
    # scope:       e.g. :user - most often the name of the Devise scope/model
    #
    # session_key: Unique key for this app and scope - used to enable multi-tab support
    def session_timeout_prompter(session_timeout_in_seconds:, timeout_warning_in_seconds:, scope:)
      render(
        partial: "/session_timeout_prompter/modal_dialogs",
        locals: {
          container_data_attributes: {
            server_ping_path:   session_timeout_prompter_server_pings_path,
            session_timeout_in_seconds: session_timeout_in_seconds,
            timeout_warning_in_seconds: timeout_warning_in_seconds,
            session_key:      "#{Rails.application.class.parent_name.downcase}-#{scope}"
          }
        }
      )
    end

  end
end
