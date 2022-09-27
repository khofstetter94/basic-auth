'use strict';

const { server, sequelizeDatabase } = require('../src/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

beforeAll (async () => {
  await sequelizeDatabase.sync();
});

afterAll (async () => {
  await sequelizeDatabase.drop();
  // if tests aren't passing maybe its a multiple - async issue
  // await sequelize.close();
});

describe('BasicAuth Tests', () => {
  test('allows a user to signin with a POST to /signin', async () => {
    let username = 'tester';
    let password = 'pass123';

    await mockRequest.post('/signup').send({ username, password });

    let response = await mockRequest
      .post('/signin')
      .auth(username, password);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual(username);
  });

  test('reject a POST to /signin without authorization header', async () => {
    let username = 'tester';
    let password = 'pass123';

    await mockRequest.post('/signup').send({ username, password });

    let response = await mockRequest
      .post('/signin');

    expect(response.status).toEqual(401);
  });
});
