[![Build Status](https://api.travis-ci.org/kgerst/adventurous.svg?branch=master)](https://travis-ci.org/kgerst/adventurous)
[![Coverage Status](https://coveralls.io/repos/github/kgerst/adventurous/badge.svg?branch=master)](https://coveralls.io/github/kgerst/adventurous?branch=master)
# adventurous

## testing 
- testing framework: [Mocha](https://mochajs.org/)
- assertion library: [Chai](http://www.chaijs.com/)
- code coverage: [istanbul](https://istanbul.js.org/)

## Log Viewer
```
npm install --global json-log-viewer
jv logs/app.log
```

## Run End to End Tests
```
./node_modules/.bin/db-migrate up --env test && ./node_modules/.bin/jasmine-node --verbose --captureExceptions ./spec/
```
