#!/bin/bash

cd /opt/meramec
export RAILS_ENV=production
export RAILS_SERVE_STATIC_FILES=1

bin/rails assets:precompile

bundle exec puma -p 3802 -e production 
