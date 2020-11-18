ENV['RAILS_ENV'] ||= 'test'

require File.expand_path("../dummy/config/environment.rb", __FILE__)
require 'spec_helper'
require 'rspec/rails'
require 'webdrivers'

RSpec.configure do |config|
  config.include Rails.application.routes.url_helpers
end

Webdrivers.install_dir = Rails.root.join('vendor', 'webdrivers')
Webdrivers.cache_time = 86_400

require 'selenium/webdriver'
Capybara.register_driver :headless_chrome do |app|
  chrome_options = Selenium::WebDriver::Chrome::Options.new
  chrome_options.add_argument('--headless') unless ENV['SHOW_CHROME']
  chrome_options.add_argument('--no-sandbox')
  chrome_options.add_argument('--disable-gpu')
  chrome_options.add_argument('--disable-dev-shm-usage')
  chrome_options.add_argument('--disable-infobars')
  chrome_options.add_argument('--disable-extensions')
  chrome_options.add_argument('--disable-popup-blocking')
  chrome_options.add_argument('--window-size=1920,4320')
  chrome_options.add_option('w3c', false)

  Capybara::Selenium::Driver.new app, browser: :chrome, options: chrome_options
end

Capybara.javascript_driver = :headless_chrome
