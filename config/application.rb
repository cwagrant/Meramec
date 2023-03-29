require_relative "boot"

require "rails/all"
require "rack"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Meramec
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    if !Rails.env.production?
      config.middleware.insert_before 0, Rack::Cors do
        allow do
          origins 'http://localhost:3000'
          resource '*', 
            headers: :any, 
            expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
            methods: [:get, :post, :patch, :put, :delete]
        end
      end
    end

    config.session_store :disabled
    config.active_job.queue_adapter = :sidekiq

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
