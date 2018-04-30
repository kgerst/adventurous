const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const fs = require('fs');
const path = require('path');

describe('static file response', function() {

  var server;
  var request;
  var testFileContents;

  beforeEach(function() {
    var filePath = path.join(__dirname, '../static', 'index.html');
    testFileContents = fs.readFileSync(filePath).toString('ascii');
    server = require('../app');
    request = require('supertest')(server)
      .get('/index.html')
      .set('User-Agent', 'any browser')
  });

  afterEach(function() {
    server.close();
  });

  it('returns the requested file', function(done) {
    request
      .set('Accept', 'text/html')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end((err, res) => {
        expect(res.text).to.include(testFileContents);
        done();
      });
  });

});