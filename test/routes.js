const chai = require('chai');
const expect = chai.expect;

describe('api routes', function() {

  var server;
  var request;

  beforeEach(function() {
    server = require('../app');
    request = require('supertest')(server)
  });

  afterEach(function() {
    server.close();
  });

  it('POST /api/pages returns 201', function(done) {
    request.post('/api/pages')
      .send({ name: 'tobi' })
      .expect(201)
      .end(done)
  });

  it('GET /api/pages/pageId returns 200', function(done) {
    request.get('/api/pages/1')
      .expect(200)
      .end(done)
  });

  it('PUT /api/pages/pageId returns 200', function(done) {
    request.put('/api/pages/1')
      .send({ name: 'tobi' })
      .expect(200)
      .end(done)
  });

  it('DELETE /api/pages/pageId returns 200', function(done) {
    request.delete('/api/pages/1')
      .expect(200)
      .end(done)
  });

  it('POST /api/pages returns 400 if Content-Type is not application/json', function(done) {
    request.post('/api/pages')
      .send('<name>tobi</name>')
      .expect(400)
      .end(done)
  })

  it('PUT /api/pages/pageId returns 400 if Content-Type is not application/json', function(done) {
    request.put('/api/pages/1')
      .send('<name>tobi</name>')
      .expect(400)
      .end(done)
  })

});