import { AppointmentModel } from '../../../../src/models/AppointmentModel';
import { Database } from '../../../../src/models/Database';

describe('AppointmentModel - positive', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('checkAppointmentClash returns results from SQL', async () => {
    const appointmentModel = new AppointmentModel();
    const rows = [{ id: 'a1' }];

    jest.spyOn(Database, 'query').mockResolvedValue(rows);

    const res = await appointmentModel.checkAppointmentClash('b1', 's1');
    expect(res).toEqual(rows);
  });
});
