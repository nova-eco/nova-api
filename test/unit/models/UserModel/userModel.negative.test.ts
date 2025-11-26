import { UserModel } from '../../../../src/models/UserModel';
import { Database } from '../../../../src/models/Database';

describe('UserModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('create throws when select returns no row', async () => {
    const userModel = new UserModel();

    jest.spyOn(Database, 'query').mockResolvedValueOnce([{}]).mockResolvedValueOnce([]);

    await expect(userModel.create({ username: 'nobody' } as any)).rejects.toThrow();
  });
});
