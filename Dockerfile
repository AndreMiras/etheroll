# Docker image for installing dependencies & running tests.
# Build with:
# docker build --tag=etheroll-js .
# Run with:
# docker run etheroll-js /bin/sh -c 'make test CI=1'
# Or for interactive shell:
# docker run -it --rm etheroll-js
FROM ubuntu:18.04

# configure locale
RUN apt update -qq > /dev/null && apt install --yes --no-install-recommends \
    locales && \
    locale-gen en_US.UTF-8
ENV LANG="en_US.UTF-8" \
    LANGUAGE="en_US.UTF-8" \
    LC_ALL="en_US.UTF-8"

# install minimal system dependencies
RUN apt update -qq > /dev/null && \
    apt install --yes --no-install-recommends \
    build-essential \
    ca-certificates \
    curl \
    git \
    gnupg \
    make \
    nodejs \
    python3

# install yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt update -qq > /dev/null && \
    apt install --yes --no-install-recommends yarn

WORKDIR /app
COPY . /app
