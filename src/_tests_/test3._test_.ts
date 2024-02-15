const request = require('supertest');
import { server } from '../../index';
import { MESSGES, testRoute } from '../constants';
import { usersMocks } from '../mocks.ts';

const nonExistentEndpoint = '/nonExistentEndpoint';

describe('Scenario #3 endpoints should handle non existent endpoints and handle invalid data', () => {
  afterEach(async () => {
    await server.close();
  });

  it('tests GET method non existent endpoint', async () => {
    const response = await request(server).get(nonExistentEndpoint);

    expect(response.body).toEqual(MESSGES.ERROR_404);
  });

  it('tests POST method non existent endpoint', async () => {
    const response = await request(server).post(nonExistentEndpoint).send(usersMocks[0]);

    expect(response.body).toEqual(MESSGES.ERROR_404);
  });

  it('tests PUT method non existent endpoint', async () => {
    const response = await request(server).post(nonExistentEndpoint).send(usersMocks[1]);

    expect(response.body).toEqual(MESSGES.ERROR_404);
  });

  it('tests DELETE method non existent endpoint', async () => {
    const response = await request(server).delete(nonExistentEndpoint);

    expect(response.body).toEqual(MESSGES.ERROR_404);
  });

  it('handle invalid data POST method', async () => {
    const response = await request(server)
      .post(testRoute)
      .send({ ...usersMocks[3], age: '12' });

    expect(response.body).toEqual(MESSGES.ERROR_400);
  });
});
