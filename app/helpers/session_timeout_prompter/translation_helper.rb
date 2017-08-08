module SessionTimeoutPrompter
  module TranslationHelper

    def session_timeout_prompter_translate(key)
      I18n.t("session_timeout_prompter.#{key}")
    end

  end
end
