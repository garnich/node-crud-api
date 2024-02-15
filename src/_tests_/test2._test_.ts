const request = require('supertest');
import { server } from '../../index';
import { validate as isValidUUID } from 'uuid';
import { MESSGES, testRoute } from '../constants';
import { usersMocks } from '../mocks.ts';

describe('Scenario #2 endpoints should handle negative scenarios', () => {
  afterEach(async () => {
    await server.close();
  });

  it('endpoint /api/users/{userId}, method = GET should handel wrong ID', async () => {
    const postResponse = await request(server).post(testRoute).send(usersMocks[0]);

    const id = postResponse.body.id;

    expect(isValidUUID(id)).toBeTruthy();

    const wrongIdArr = id.split('');
    wrongIdArr[wrongIdArr.length - 1] = Number(wrongIdArr[wrongIdArr.length - 1]) > 5 ? '1' : '6';

    const wrongId = wrongIdArr.join('');
    const result = { id, ...usersMocks[0] };
    const getResponse = await request(server).get(`${testRoute}/${id}`);

    expect(getResponse.body).toEqual(result);

    const getResponseWithWrongId = await request(server).get(`${testRoute}/${wrongId}`);

    expect(getResponseWithWrongId.body).toEqual(`${MESSGES.ERROR_NOT_FOUND} ${wrongId}`);
  });

  it('endpoint /api/users/{userId}, method = PUT should handel wrong ID', async () => {
    const postResponse = await request(server).post(testRoute).send(usersMocks[1]);
    const id = postResponse.body.id;

    expect(isValidUUID(id)).toBeTruthy();

    const wrongIdArr = id.split('');
    wrongIdArr[wrongIdArr.length - 1] = Number(wrongIdArr[wrongIdArr.length - 1]) > 5 ? '1' : '6';
    const wrongId = wrongIdArr.join('');
    const updateResponseWithInvalidId = await request(server).put(`${testRoute}/${wrongId}`).send({ age: 41 });

    expect(updateResponseWithInvalidId.body).toEqual(`${MESSGES.ERROR_NOT_FOUND} ${wrongId}`);
  });

  it('endpoint /api/users/{userId}, method = DELETE should handle invalid ID', async () => {
    const notVaildId = '123';

    expect(isValidUUID(notVaildId)).toBeFalsy();

    const deleteResultWithNotValidId = await request(server).delete(`${testRoute}/${notVaildId}`);

    expect(deleteResultWithNotValidId.body).toEqual(MESSGES.ERROR_INVALID_ID);
  });

  it('endpoint /api/users/{userId}, method = DELETE should handle non existing ID', async () => {
    const nonExistingId = '954063c9-396b-40a3-b65b-2d667c5d63a4';

    expect(isValidUUID(nonExistingId)).toBeTruthy();

    const deleteResultWithNonExistingId = await request(server).delete(`${testRoute}/${nonExistingId}`);

    expect(deleteResultWithNonExistingId.body).toEqual(`${MESSGES.ERROR_NOT_FOUND} ${nonExistingId}`);
  });
});
