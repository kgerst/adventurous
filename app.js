const logger = require('./logger.js');
const log = logger.appLogger
const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');

const PORT = 3000;
const app = express();

const staticFiles = function(request, response, next) {
  var filePath = path.join(__dirname, 'static', request.url);
  fs.stat(filePath, function(err, fileInfo) {
    if (err) {
      next();
      return;
    }

    if (fileInfo.isFile()) {
      response.sendFile(filePath);
    } else {
      next();
    }
  });
}

app.use(logger.requests);
app.use(staticFiles);

app.get('/', function(request, response) {
  response.end();
});

app.use(function(request, response) {
  response.statusCode = 404;
  response.end('404');
});

app.use(logger.errors);

app.listen(PORT, function() {
  log.info('listening on port ' + PORT);
});