#!/bin/bash

cd /opt/meramec || exit
printf 'env var RAILS_ENV = %s' "$RAILS_ENV"
printf 'env var RACK_ENV = %s' "$RACK_ENV"
printf 'env var REDIS_URL = %s' "$REDIS_URL"
printf 'env var JOB_WORKER_URL = %s' "$JOB_WORKER_URL"

bin/rails assets:precompile
bin/rake db:migrate
bin/rake db:seed

exec "$@"
