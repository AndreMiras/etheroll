all: install

install:
	yarn install

clean:
	rm -rf node_modules/

test: install
	yarn test --watchAll=false

lint: install
	yarn lint
