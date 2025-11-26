import { StaffModel } from '../../../../src/models/StaffModel';
import { Database } from '../../../../src/models/Database';

describe('StaffModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('create throws when no record returned from select', async () => {
    const staffModel = new StaffModel();

    jest
      .spyOn(Database, 'query')
      .mockResolvedValueOnce([{}]) // insert result
      .mockResolvedValueOnce([]); // select returns nothing

    await expect(staffModel.create({ name: 'Bob' } as any)).rejects.toThrow();
  });
});
