require 'rails_helper'

feature "Timeout Warning", js: true do

  context "when the timeout warning is set to 300 seconds" do
    context "and 299 seconds have passed" do
      scenario "I do not see the prompt" do
        visit root_path
        expect(page).to have_content "Your session will expire and you will be automatically logged out in"
      end
    end
  end

end
