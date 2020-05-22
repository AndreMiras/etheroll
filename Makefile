DOCKER_IMAGE=andremiras/etheroll-js
DOCKER_COMMAND ?= /bin/bash
DOCKER_PORT=8000

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
	docker build --tag=$(DOCKER_IMAGE) --target=base .

docker/build-full:
	docker build --tag=$(DOCKER_IMAGE)-full --target=full .

docker/build-prod:
	docker build --tag=$(DOCKER_IMAGE)-prod --target=prod .

docker/run:
	docker run --rm -it $(DOCKER_IMAGE) $(DOCKER_COMMAND)

docker/run-prod:
	docker run --rm -it --env PORT=$(DOCKER_PORT) --publish $(DOCKER_PORT):$(DOCKER_PORT) $(DOCKER_IMAGE)-prod
