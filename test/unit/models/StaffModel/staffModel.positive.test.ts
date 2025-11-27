import { Database } from '../../../../src/models/Database';
import { StaffModel } from '../../../../src/models/StaffModel';

describe('StaffModel - positive', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('create returns created record when Database.query returns result', async () => {
    const staffModel = new StaffModel();

    const insertedRecord = { id: 's1', name: 'Alice' };

    const dbMock = jest
      .spyOn(Database, 'query')
      .mockResolvedValueOnce([{}]) // insert result (ignored)
      .mockResolvedValueOnce([insertedRecord]); // select returns created

    const result = await staffModel.create({
      accountId: 'account-123',
      companyStaffRoleId: 'role-456',
    });

    expect(dbMock).toHaveBeenCalled();
    expect(result).toEqual(insertedRecord);
  });
});
