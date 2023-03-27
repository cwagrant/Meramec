#!/bin/bash

cd /opt/meramec || exit
printf 'env var RAILS_ENV = %s' "$RAILS_ENV"
printf 'env var RACK_ENV = %s' "$RACK_ENV"

bin/rails assets:precompile
bin/rake db:migrate
bin/rake db:seed

bundle exec puma -p 3802 -e production
