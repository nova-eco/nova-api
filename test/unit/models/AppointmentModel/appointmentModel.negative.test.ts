import { AppointmentModel } from '../../../../src/models/AppointmentModel';
import { Database } from '../../../../src/models/Database';

describe('AppointmentModel - negative', () => {
  beforeEach(() => jest.restoreAllMocks());

  test('checkAppointmentClash returns empty array when no clash', async () => {
    const appointmentModel = new AppointmentModel();

    jest.spyOn(Database, 'query').mockResolvedValue([]);

    const res = await appointmentModel.checkAppointmentClash('b1', 's1');
    expect(res).toEqual([]);
  });
});
