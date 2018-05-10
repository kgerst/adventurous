'use strict';

const resetDatabase = require('../resetDatabase.js');
const dbSession = require('../../db/dbSession.js');

var request = require('request');

describe('The API', function() {

  it('should respond to GET /api/pages/:id', async function(done) {

    var expected = {
      'id': 1,
      'title': 'Start',
      'text': 'Text for page one.'      
    }

    await resetDatabase(dbSession);

    await dbSession.insert(
      'page',
      {'id': 1, 'title': 'Start', 'text': 'Text for page one.'},
      function(err) { if (err) throw err; }
    );

    await request.get(
      {
        'url': 'http://localhost:3000/api/pages/1',
        'json': true
      },
      function (err, res, body) {
        expect(res.statusCode).toBe(200);
        expect(body).toEqual(expected);
        done();
      });
    });

  it('should return 404 to GET /api/pages/:id when page not found', async function(done) {

    await resetDatabase(dbSession);

    await dbSession.insert(
      'page',
      {'id': 1, 'title': 'Start', 'text': 'Text for page one.'},
      function(err) { if (err) throw err; }
    );

    await request.get(
      {
        'url': 'http://localhost:3000/api/pages/2',
        'json': true
      },
      function (err, res, body) {
        expect(res.statusCode).toBe(404);
        done();
      });
    });  
});