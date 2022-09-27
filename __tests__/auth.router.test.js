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

describe('Test /hello route', () => {
  test('allows a user to send a GET /hello with credentials', async () => {
    let username = 'tester';
    let password = 'pass123';
    let name = 'kc';

    await mockRequest.post('/signup').send({ username, password });

    let response = await mockRequest
      .get(`/hello?name=${name}`)
      .auth(username, password);

    expect(response.status).toEqual(200);
    expect(response.text).toEqual(`Greetings ${name}! this route is now secured by Basic AUth!!!`);
  });
});
