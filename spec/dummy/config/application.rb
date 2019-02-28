require_relative 'boot'

require 'rails/all'
require 'jquery-rails'
require 'bootstrap-sass'

Bundler.require(*Rails.groups)
require "session_timeout_prompter"

module Dummy
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Get rid of deprecation warning
    config.active_record.sqlite3.represent_boolean_as_integer = true
  end
end
