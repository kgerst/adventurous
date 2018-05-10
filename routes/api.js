const express = require("express");
const logger = require('../logger.js');
const log = logger.appLogger;
const dbSession = require('../db/dbSession.js');

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

  dbSession.getSelect()
    .from('page')
    .where('id=?', pageId)
    .fetchRow( function(err, page) {

      if (err) {
        return response.status.internalServerError(err);
      } 
      
      if (page) {
        log.info(`Found Page titled '${page.title}' with Id ${page.id}`);
        return response.json(page);
      }

      log.info(`Did not find Page with Id ${pageId}`);
      return response.status(404).end();
    });
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