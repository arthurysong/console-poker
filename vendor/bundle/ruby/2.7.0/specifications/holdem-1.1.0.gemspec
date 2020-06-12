# -*- encoding: utf-8 -*-
# stub: holdem 1.1.0 ruby lib

Gem::Specification.new do |s|
  s.name = "holdem".freeze
  s.version = "1.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jamie Berczel".freeze]
  s.date = "2020-05-20"
  s.description = "A ruby module for creating and comparing Texas Holdem poker hands.".freeze
  s.email = ["jxberc@gmail.com".freeze]
  s.homepage = "".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "A ruby module for creating and comparing Texas Holdem poker hands.".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, ["~> 2.1.4"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 13.0.1"])
    s.add_development_dependency(%q<minitest>.freeze, ["~> 5.14.1"])
    s.add_development_dependency(%q<minitest-reporters>.freeze, ["~> 1.4.2"])
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 2.1.4"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0.1"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.14.1"])
    s.add_dependency(%q<minitest-reporters>.freeze, ["~> 1.4.2"])
  end
end
