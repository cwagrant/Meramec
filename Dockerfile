FROM ruby:3.2.0

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg -o /root/yarn-pubkey.gpg && apt-key add /root/yarn-pubkey.gpg
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y --no-install-recommends nodejs yarn

ENV INSTALL_PATH /opt/app
RUN mkdir -p $INSTALL_PATH
VOLUME ["/data"]

WORKDIR /opt/app
RUN git clone https://github.com/cwagrant/Meramec.git

RUN gem install bundler
RUN bundle install
RUN yarn install

RUN bundle exec rails assets:precompile

CMD bundle exec puma -p 3802 -e production
EXPOSE 3802








