require 'rails_helper'

feature "Timed Out", js: true do

  def timed_out_text
    I18n.t("session_timeout_prompter.session_timed_out")
  end

  context "when the timeout is set at 5 seconds" do

    before { visit timeout_5_warning_3_path }

    context "and 3 seconds have passed" do
      before { sleep 3 }

      scenario "I do not see the prompt" do
        expect(page).not_to have_content timed_out_text
      end
    end

    context "and more than 5 seconds have passed" do
      before { sleep 6 }

      scenario "I see the prompt" do
        debugger
        expect(page).to have_content timed_out_text
      end

      scenario "I can opt to log in again" do
        click_link "Log in again"
        expect(page).to have_content "Log in here"
      end
    end

  end

end

class TimedOutNotFound < StandardError; end
