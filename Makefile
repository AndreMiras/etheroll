BIN_DIR=./node_modules/.bin/
ESLINT=$(BIN_DIR)/eslint
SOURCE_DIR=src/


all: build

build:
	npm build

clean:
	rm -rf node_modules/

test:
	$(ESLINT) $(SOURCE_DIR)
