const express = require("express");
const logger = require('../logger.js');
const log = logger.appLogger;

const api = express.Router();

api.post(/^\/api\/pages$/, function (request, response, next) {
  var contentType = request.headers['content-type'];
  if (contentType !== 'application/json') {
    log.info(`POST with bad contentType: ${contentType}`);
    response.status(400).end();
  } else {
    var data = request.body;
    log.info(`POST: ${JSON.stringify(data)}`);
    response.status(201).end();
  }
});

api.get(/^\/api\/pages\/(\d+)$/, function(request, response, next) {
  var pageId = parseInt(request.params[0], 10);
  log.info(`GET Page Id: ${pageId}`);
  response.status(200).end();
});

api.delete(/^\/api\/pages\/(\d+)$/, function(request, response, next) {
  var pageId = parseInt(request.params[0], 10);
  log.info(`DELETE Page Id: ${pageId}`);
  response.status(200).end();
});

api.put(/^\/api\/pages\/(\d+)$/, function(request, response, next) {
  var contentType = request.headers['content-type'];
  if (contentType !== 'application/json') {
    log.info(`PUT with bad contentType: ${contentType}`);
    response.status(400).end();
  } else {
    var pageId = parseInt(request.params[0], 10);
    log.info(`PUT Page Id: ${pageId}`);
    response.status(200).end();
  }
});

module.exports = api;