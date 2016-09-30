
.PHONY: all jshint npm


all: jshint dist

jshint: npm
	node_modules/.bin/jshint stacktrace.js

dist:
	cp -f stacktrace.js dist/stacktrace.js

npm:
	npm install
	
