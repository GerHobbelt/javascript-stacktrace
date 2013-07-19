
.PHONY: all jshint npm


all: jshint

jshint: npm
	node_modules/.bin/jshint stacktrace.js

npm:
	npm install
	
