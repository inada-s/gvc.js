all: build

.PHONY: build
build:
	haxe compile.hxml
	yuicompressor bin/js/gvc.js -o bin/js/gvc.min.js

