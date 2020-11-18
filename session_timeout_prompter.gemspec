# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'session_timeout_prompter/version'

Gem::Specification.new do |spec|
  spec.name          = 'session_timeout_prompter'
  spec.version       = SessionTimeoutPrompter::VERSION
  spec.authors       = ['Ant Nettleship', 'Ryan Bibby']
  spec.email         = ['anthony.nettleship@epigenesys.org.uk', 'ryan.bibby@epigenesys.org.uk']

  spec.summary       = 'A Rails Engine to prompt the user when their session is about to timeout and allow them to extend it.'
  spec.homepage      = 'https://github.com/epigenesys/session-timeout-prompter'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features|src)/})
  end
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'rails', '>= 5.0'
  spec.add_dependency 'railties', '>= 5.0'
  spec.add_dependency 'webpacker', '>= 5.0'

  spec.add_development_dependency 'bundler', '~> 1.15'
  spec.add_development_dependency 'rake', '~> 10.0'
  spec.add_development_dependency 'rspec', '>= 3.9.0'
  spec.add_development_dependency 'rspec-rails', '>= 4.0.0'
  spec.add_development_dependency 'rails', '>= 6.0'
  spec.add_development_dependency 'sassc-rails', '>= 2.1.0'
  spec.add_development_dependency 'webpacker', '>= 5.2'
  spec.add_development_dependency 'capybara', '>= 3.33.0'
  spec.add_development_dependency 'poltergeist'
  spec.add_development_dependency 'launchy'
  spec.add_development_dependency 'byebug'
  spec.add_development_dependency 'sqlite3', '~> 1.4.2'
  spec.add_development_dependency 'jasmine'
  spec.add_development_dependency 'babel-transpiler'
  spec.add_development_dependency 'selenium-webdriver'
  spec.add_development_dependency 'webdrivers'
  spec.add_development_dependency 'puma'
end
