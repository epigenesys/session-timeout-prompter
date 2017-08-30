require 'rails_helper'

feature "Timeout Warning", js: true do

  def timeout_warning_text
    I18n.t("session_timeout_prompter.your_session_will_expire_in")
  end

  context "when the timeout is set at 5 seconds" do
    context "and the timeout warning is set to 3 seconds" do

      before { visit timeout_5_warning_3_path }

      context "and 1 second has passed" do
        before { sleep 1 }

        scenario "I do not see the prompt" do
          expect(page).not_to have_content timeout_warning_text
        end
      end

      context "and 2 seconds have passed" do
        before { sleep 2.5 }

        scenario "I see the prompt" do
          expect(page).to have_content timeout_warning_text
        end

        scenario "I can indicate I wish to remain logged in" do
          click_button 'Yes keep me logged in - I am still using the system'
          expect(page).not_to have_content timeout_warning_text
        end
      end

    end
  end

end

class TimeoutWarningNotFound < StandardError; end
