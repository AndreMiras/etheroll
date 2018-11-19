BIN_DIR=./node_modules/.bin
ESLINT=$(BIN_DIR)/eslint
SOURCE_DIR=src/


all: install

install:
	yarn install

clean:
	rm -rf node_modules/

test: install
	yarn test --watchAll=false

lint: install
	$(ESLINT) $(SOURCE_DIR)
