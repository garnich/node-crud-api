const request = require('supertest');
import { validate as isValidUUID } from 'uuid';
import { server } from '../../index';
import { MESSGES, testRoute } from '../constants';
import { usersMocks } from '../mocks.ts';

describe('Scenario #1 endpoints work properly', () => {
  afterEach(async () => {
    await server.close();
  });

  it('endpoint /api/users, method = GET', async () => {
    const response = await request(server).get(testRoute);

    expect(response.body).toEqual([]);
  });

  it('endpoint /api/users, method = POST', async () => {
    const response = await request(server).post(testRoute).send(usersMocks[0]);

    expect(response.body.hobbies).toEqual(['sport']);
    expect(response.body.age).toEqual(25);
    expect(response.body.username).toEqual('Mikle');
    expect(isValidUUID(response.body.id)).toBeTruthy();
  });

  it('endpoint /api/users/{userId}, method = GET', async () => {
    const postResponse = await request(server).post(testRoute).send(usersMocks[1]);
    const id = postResponse.body.id;
    const getResponse = await request(server).get(`${testRoute}/${id}`);

    expect(getResponse.body).toEqual({ id, ...usersMocks[1] });
  });

  it('endpoint /api/users/{userId}, method = PUT', async () => {
    const postResponse = await request(server).post(testRoute).send(usersMocks[2]);

    const id = postResponse.body.id;
    const result = { id, ...usersMocks[2] };

    const updateResponse = await request(server).put(`${testRoute}/${id}`).send({ age: 41 });

    expect(updateResponse.body).toEqual({ ...result, age: 41 });
  });

  it('endpoint /api/users/{userId}, method = DELETE', async () => {
    const postResponse = await request(server).post(testRoute).send(usersMocks[3]);

    const id = postResponse.body.id;
    const deleteResp = `${MESSGES.USER_DELETED} ${id}`;
    const getResp = `${MESSGES.ERROR_NOT_FOUND} ${id}`;
    const updateResponse = await request(server).delete(`${testRoute}/${id}`);

    expect(updateResponse.body).toEqual(deleteResp);

    const getResponse = await request(server).get(`${testRoute}/${id}`);

    expect(getResponse.body).toEqual(getResp);
  });
});
