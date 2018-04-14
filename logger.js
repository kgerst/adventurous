const expressWinston = require('express-winston');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const winston = require('winston');

const level = process.env.LOG_LEVEL || 'debug';
const logDirectory = path.join(__dirname, 'logs');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
});

const appLogStream = rfs('app.log', {
  interval: '1d',
  path: logDirectory
});

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      json: true,
      timestamp: function() {
        return (new Date()).toISOString();
      }
    }),
    new winston.transports.File({
      colorize: true,
      json: true,
      level: level,
      timestamp: function() {
        return (new Date()).toISOString();
      },
      stream: appLogStream
    })
  ]
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      json: true,
      timestamp: function() {
        return (new Date()).toISOString();
      }
    }),
    new winston.transports.File({
      colorize: true,
      json: true,
      timestamp: function() {
        return (new Date()).toISOString();
      },
      stream: accessLogStream
    })
  ]
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      colorize: true,
      json: true,
      timestamp: function() {
        return (new Date()).toISOString();
      }
    }),
    new winston.transports.File({
      colorize: true,
      json: true,
      timestamp: function() {
        return (new Date()).toISOString();
      },
      stream: appLogStream
    })
  ]
});


module.exports = {
  appLogger: logger,
  requests: requestLogger,
  errors: errorLogger
}
