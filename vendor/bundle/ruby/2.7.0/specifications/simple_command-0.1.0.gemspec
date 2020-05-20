# -*- encoding: utf-8 -*-
# stub: simple_command 0.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "simple_command".freeze
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Andrea Pavoni".freeze]
  s.date = "2019-09-03"
  s.description = "Easy way to build and manage commands (service objects)".freeze
  s.email = ["andrea.pavoni@gmail.com".freeze]
  s.homepage = "http://github.com/nebulab/simple_command".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Easy way to build and manage commands (service objects)".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, ["~> 1.7"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.1"])
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.1"])
  end
end
