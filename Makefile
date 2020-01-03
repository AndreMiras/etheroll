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
