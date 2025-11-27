import { Database } from '../../../../src/models/Database';
import { UserModel } from '../../../../src/models/UserModel';

describe('UserModel - positive', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('create returns created user', async () => {
    const userModel = new UserModel();
    const created = { id: 'u1', username: 'tester' };

    jest
      .spyOn(Database, 'query')
      .mockResolvedValueOnce([{}])
      .mockResolvedValueOnce([created]);

    const res = await userModel.create({
      username: 'tester',
      userStatusId: '1',
      forename: 'Test',
      surname: 'User',
    });
    expect(res).toEqual(created);
  });
});
