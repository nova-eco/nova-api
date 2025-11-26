import { BookingPreModel } from '../../../../src/models/BookingPreModel';
import { Database } from '../../../../src/models/Database';

describe('BookingPreModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('findByPk returns null when DB returns empty', async () => {
    const bookingPreModel = new BookingPreModel();
    jest.spyOn(Database, 'query').mockResolvedValueOnce([]);
    const res = await bookingPreModel.findByPk('bp1');
    expect(res).toBeNull();
  });
});
