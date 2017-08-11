# coding: utf-8
lib = File.expand_path("../lib", __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require "session_timeout_prompter/version"

Gem::Specification.new do |spec|
  spec.name          = "session_timeout_prompter"
  spec.version       = SessionTimeoutPrompter::VERSION
  spec.authors       = ["Ant Nettleship"]
  spec.email         = ["anthony.nettleship@epigenesys.org.uk"]

  spec.summary       = ""#%q{TODO: Write a short summary, because Rubygems requires one.}
  spec.description   = ""#%q{TODO: Write a longer description or delete this line.}
  spec.homepage      = ""#"TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  # Prevent pushing this gem to RubyGems.org. To allow pushes either set the 'allowed_push_host'
  # to allow pushing to a single host or delete this section to allow pushing to any host.
  if spec.respond_to?(:metadata)
    spec.metadata["allowed_push_host"] = "TODO: Set to 'http://mygemserver.com'"
  else
    raise "RubyGems 2.0 or newer is required to protect against " \
      "public gem pushes."
  end

  spec.files         = `git ls-files -z`.split("\x0").reject do |f|
    f.match(%r{^(test|spec|features|src)/})
  end
  spec.bindir        = "exe"
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_dependency 'jquery-rails', '>= 4.0'
  spec.add_dependency 'railties', '>= 4.0'
  spec.add_dependency 'hamlit'

  spec.add_development_dependency "bundler", "~> 1.15"
  spec.add_development_dependency "rake", "~> 10.0"
  spec.add_development_dependency "rspec", ">= 3.0"
  spec.add_development_dependency "rspec-rails", ">= 3.0"
  spec.add_development_dependency "rails", ">= 4.0"
  spec.add_development_dependency "capybara", ">= 2.4"
  spec.add_development_dependency 'poltergeist'
  spec.add_development_dependency 'launchy'
  spec.add_development_dependency "byebug"
  spec.add_development_dependency 'sqlite3'
  spec.add_development_dependency "jasmine"
  spec.add_development_dependency "babel-transpiler"
end