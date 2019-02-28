# Session Timeout Prompter

A Rails 5 Engine to prompt the user when their session is about to timeout and allow them to extend it.

## Dependencies

This only works with Bootstrap 3 at present, but we would be happy to receive a pull request for Bootstrap 4 compatibility.

## Installation

Add the gem to your Gemfile:

```ruby
gem 'session_timeout_prompter'
```

Run bundle install

```ruby
bundle install
```

Mount the engine in your routes:

```ruby
mount SessionTimeoutPrompter::Engine, at: "/session_timeout_prompter"
```

Require the js:

```
//= session_timeout_prompter
```

Require the css:

```
*= require session_timeout_prompter
```

**Note:** Currently depends on jQuery for ajax / event handling.

## Usage

Add the following after the body tag in your layout or on any page you wish to display the timeout prompt:

```ruby
= init_session_timeout_prompter(session_timeout_in_seconds: User.timeout_in.to_i, seconds_to_warn_before_timeout: 305, scope: :user)
```
(The example values assume you are using Devise timeoutable and are using a scope/model called User. The scope is purely so you can use multiple in the same application if necessary.)


### Configurables

#### "Log in again" path
By default, clicking the "Log in again" button will go to your application's root path. Due to the inherent inaccuracy of timing in Javascript it is advisable to  make sure they're actually logged out to avoid confusion. To do this, simple override the controller action in your application:

```ruby
# app/controllers/session_timeout_prompter/sessions_controller.rb
module SessionTimeoutPrompter
  class SessionsController < ActionController::Base

    def new
      sign_out current_user
      redirect_to new_user_session_path
    end

  end
end
```

#### Keeping the session alive
You can bind your own events to ping the server as follows:

```javascript
$(function(){
  if(sessionTimeoutPrompter) {

    // Ping server on scroll
    $(window).on('scroll', function() {
      serverPinger.pingServerWithThrottling();
    });

    // Ping server when typing or clicking
    $(document).on('keydown click', function() {
      serverPinger.pingServerWithThrottling();
    });

    // Ping server when scrolling inside a modal window
    // (the ajax-modal-show event in this example is from ajax_modal in the epiJs gem)
    $(document).on('ajax-modal-show', function() {
      $('#modalWindow').scroll( function() {
        serverPinger.pingServerWithThrottling();
      });
    });

    // Ping server when a key is pressed in CKEditor
    CKEDITOR.on('instanceCreated', function(e) {
      e.editor.on('change', function() {
        serverPinger.pingServerWithThrottling();
      });
    });

  }
});
```

#### I18n
All of the text is rendered via Rails' standard I18n library. See `config/locales/en.yml`

## Development

After checking out the repo, run `bin/setup` to install dependencies.

### ES6

The Javascript is written in ES6 and transpiled with Babel. The ES6 should be modified in `src/javascripts` and then transpiled to `app/assets/javascripts/session_timeout_prompter.js`. Currently we don't make use of modules (we'd need webpack or similar), but this would probably be an improvement going forward to control scope.

There is a handy script `./build` that will do the transpilation and run the tests. Run with --help for options.

### Testing

Uses RSpec and Jasmine for automated testing. To run the Jasmine tests for the Javascript run `rake jasmine` and go to `localhost:8888` in your browser. The suite will run every time the page is reloaded.

### Deployment
To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/session_timeout_prompter.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
