DOCKER_IMAGE=etheroll-js
DOCKER_COMMAND ?= /bin/bash

all: install

install:
	yarn install

clean:
	rm -rf node_modules/

test: install
	yarn test --watchAll=false

start: install
	yarn start

lint: install
	yarn lint

intl: install
	yarn intl

deploy: install
	yarn deploy

docker/build:
	docker build --tag=$(DOCKER_IMAGE) .

docker/run:
	docker run --rm -it $(DOCKER_IMAGE) $(DOCKER_COMMAND)
