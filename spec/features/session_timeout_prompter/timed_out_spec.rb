require 'rails_helper'

feature "Timed Out", js: true do

  def timed_out_text
    I18n.t("session_timeout_prompter.session_timed_out")
  end

  context "when the timeout is set at 5 seconds" do
    # Setup: spec/dummy/app/views/layout/application.html.erb

    before { visit root_path }

    context "and 3 seconds has passed" do
      before { sleep 3 }

      scenario "I do not see the prompt" do
        expect(page).not_to have_content timed_out_text
      end
    end

    context "and  more than 5 seconds have passed" do
      scenario "I see the prompt" do
        Timeout.timeout(6, TimedOutNotFound) do
          begin
            loop until first(:css, '*', text: timed_out_text, visible: true)
          rescue TimedOutNotFound
            fail "timed out prompt not found"
          end
        end
        expect(true).to be_truthy
      end
    end

  end

end

class TimedOutNotFound < StandardError; end
