import { BookingPreModel } from '../../../../src/models/BookingPreModel';
import { Database } from '../../../../src/models/Database';

describe('BookingPreModel - positive', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('findByPk returns a bookingPre when DB returns a row', async () => {
    const bookingPreModel = new BookingPreModel();
    const row = { id: 'bp1' };
    jest.spyOn(Database, 'query').mockResolvedValueOnce([row]);
    const res = await bookingPreModel.findByPk('bp1');
    expect(res).toEqual(row);
  });
});
