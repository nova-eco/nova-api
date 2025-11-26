import { GetPreBookingsHandler } from '../../../../src/engines/BookingAvailabilityEngine/handlers/GetPreBookingsHandler';
import { BookingAvailabilityContext } from '../../../../src/engines/BookingAvailabilityEngine/context';

describe('GetPreBookingsHandler', () => {
  test('fetches pre bookings and places in result', async () => {
    const fake = [{ id: 'pb1' }];
    const handler = new GetPreBookingsHandler();
    const ctx = {
      companyId: 'c1',
      bookingPreModel: { getPreBookingsByCompany: jest.fn().mockResolvedValue(fake) },
    } as unknown as BookingAvailabilityContext;
    await handler.handle(ctx);
    expect(ctx.result).toBe(fake);
  });
});
