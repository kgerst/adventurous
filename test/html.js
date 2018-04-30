const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const fs = require('fs');
const path = require('path');

describe('html response', function() {

  var server;
  var request;
  var testFileContents;

  beforeEach(function() {
    var filePath = path.join(__dirname, '../static', 'index.html');
    testFileContents = fs.readFileSync(filePath).toString('ascii');
    server = require('../app');
    request = require('supertest')(server)
  });

  afterEach(function() {
    server.close();
  });

  it('returns an html response', function(done) {
    request
      .get('/')
      .set('User-Agent', 'any browser')
      .set('Accept', 'text/html')
      .expect('Content-Type', /text\/html/)
      .expect(200)
      .end(done);
  });

  it('returns default page', function(done) {
    request
      .get('/')
      .set('User-Agent', 'any browser')
      .set('Accept', 'text/html')
      .end((err, res) => {
        expect(res.text).to.include(testFileContents);
        done();
      });
  });

  it('404 error if bad path', function(done) {
    request
      .get('/does-not-exist')
      .set('User-Agent', 'any browser')
      .set('Accept', 'text/html')
      .expect(404)
      .end(done);
  });

});