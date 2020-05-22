# Docker image for installing dependencies & running tests.
# Build with:
# docker build --tag=andremiras/etheroll-js .
# Run with:
# docker run andremiras/etheroll-js /bin/sh -c 'make test CI=1'
# Or for interactive shell:
# docker run -it --rm andremiras/etheroll-js
FROM ubuntu:18.04 as base

# install dependencies and configure locale
RUN apt update -qq > /dev/null && apt --yes install --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    git \
    gnupg \
    locales \
    make \
    nodejs \
    python3 \
    && locale-gen en_US.UTF-8 \
    && apt --yes autoremove && apt --yes clean

ENV LANG="en_US.UTF-8" \
    LANGUAGE="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8"

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt update -qq > /dev/null && apt --yes install --no-install-recommends yarn

WORKDIR /app
COPY . /app

FROM base as full
RUN make && yarn build-staging

# prod environment
FROM nginx:1.17.10 as prod
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=full /app/build /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
