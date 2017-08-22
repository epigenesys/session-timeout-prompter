# Session Timeout Prompter

UNDER CONSTRUCTION

Rails Engine to prompt the user when their session is about to timeout and allow them to extend it.

## Installation

Add the gem to your Gemfile:

```ruby
gem 'session_timeout_prompter'
```

Require the js: `//= session_timeout_prompter`

Require the css `*= require session_timeout_prompter`

Add `= session_timeout_prompter(session_timeout_in_seconds: User.timeout_in.to_i, timeout_warning_in_seconds: 305, scope: :user)` after the body tag in your layout. (Assuming you are using Devise and are using a scope/model called User).


Configurables:

Modify routes... TODO... due to the inherent inaccuracy of timing in Javascript it is advisable to go via logout to make sure they're actually logged out to avoid confusion.

destroy_user_session_path

## Usage

TODO: Write usage instructions here


## Development

After checking out the repo, run `bin/setup` to install dependencies. Then, run `rake spec` to run the tests. You can also run `bin/console` for an interactive prompt that will allow you to experiment.

To install this gem onto your local machine, run `bundle exec rake install`. To release a new version, update the version number in `version.rb`, and then run `bundle exec rake release`, which will create a git tag for the version, push git commits and tags, and push the `.gem` file to [rubygems.org](https://rubygems.org).

### ES6!

The Javascript is written in ES6 and transpiled with Babel. The ES6 should be modified in `src/javascripts` and then transpiled to `app/assets/javascripts/session_timeout_prompter.js`.

There is a handy script `./build` that will do the transpilation and run the tests.

### Testing

Uses RSpec and Jasmine for automated testing. To run the Jasmine tests for the Javascript run `rake jasmine` and go to `localhost:8888` in your browser. The suite will run every time the page is reloaded.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/[USERNAME]/session_timeout_prompter.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
