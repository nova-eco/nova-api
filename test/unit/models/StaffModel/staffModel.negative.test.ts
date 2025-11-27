import { Database } from '../../../../src/models/Database';
import { StaffModel } from '../../../../src/models/StaffModel';

describe('StaffModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('create throws when no record returned from select', async () => {
    const staffModel = new StaffModel();

    jest
      .spyOn(Database, 'query')
      .mockResolvedValueOnce([{}]) // insert result
      .mockResolvedValueOnce([]); // select returns nothing

    await expect(
      staffModel.create({
        accountId: 'account-789',
        companyStaffRoleId: 'role-012',
      }),
    ).rejects.toThrow();
  });
});
