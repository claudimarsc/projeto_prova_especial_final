const app = require('../server');

const request = require('supertest');

describe('GET all', () => {
  describe('GET /', () => {
    it('should get 200', done => {
      request(app).get('/v1/posts').expect(200, done);
    });

  });
});