FROM ruby:3.2.0

RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH
VOLUME ["/data"]

WORKDIR $INSTALL_PATH
RUN git clone https://github.com/cwagrant/Meramec.git

WORKDIR $INSTALL_PATH/Meramec

RUN gem install bundler
RUN bundle install
RUN npm install --legacy-peer-deps

ENV RAILS_ENV production
RUN bundle exec rails assets:precompile

CMD bundle exec puma -p 3802 -e production
EXPOSE 3802








