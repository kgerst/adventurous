var express = require("express");
var fs = require("fs");
var http = require("http");
var morgan = require("morgan");
var path = require("path");
var rfs = require('rotating-file-stream');

var app = express();
var logDirectory = path.join(__dirname, 'log');

function logger() {
  fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

  var accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
  });

  return morgan("combined", {stream: accessLogStream});
}

function static() {
  var publicPath = path.resolve(__dirname, "public");
  return express.static(publicPath);
}

app.use(logger());
app.use(static());

app.get("/", function(request, response) {
  response.end("home");
});

app.use(function(request, response) {
  response.statusCode = 404;
  response.end("404");
});

app.listen(3000);