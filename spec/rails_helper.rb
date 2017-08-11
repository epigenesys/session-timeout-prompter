ENV['RAILS_ENV'] ||= 'test'

require File.expand_path("../dummy/config/environment.rb", __FILE__)
require 'spec_helper'
require 'rspec/rails'
require 'capybara/poltergeist'

RSpec.configure do |config|
  config.include Rails.application.routes.url_helpers
end

Capybara.javascript_driver = :poltergeist
