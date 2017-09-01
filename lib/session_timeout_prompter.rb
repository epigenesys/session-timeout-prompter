require "session_timeout_prompter/version"

module SessionTimeoutPrompter
  class Engine < Rails::Engine
    isolate_namespace SessionTimeoutPrompter

    initializer "session_timeout_prompter.include_prompt_helper" do |app|
      ActiveSupport.on_load(:action_controller) do
        helper SessionTimeoutPrompter::PromptHelper
      end
    end

  end
end
