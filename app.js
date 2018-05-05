const logger = require('./logger.js');
const log = logger.appLogger
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

const debug = require('debug')('adventurous')
const name = 'adventurous-app'

const PORT = 3000;
const app = express();

app.use(logger.requests);
app.use(express.static('static'));

// app.get('/', function(request, response) {});

app.use(function(request, response) {
  response.statusCode = 404;
  response.end(`404 ${request.url} Not Found`);
});

app.use(logger.errors);

app.use(function(err, request, response, next) {
  response.statusCode = 500;
  response.end(`500 Internal Server Error`);
});

const server = app.listen(PORT, function() {
  log.info('%s listening on port %s', name, PORT);
});

module.exports = server;
