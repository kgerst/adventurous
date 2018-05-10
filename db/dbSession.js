'use strict';
require('sqlite3');

var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper = new DBWrapper('sqlite3', {'path': '/var/tmp/adventurous.test.sqlite'});
dbWrapper.connect();

module.exports = dbWrapper;