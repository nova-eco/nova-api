import { LoadBookingPreHandler } from '../../../../src/engines/BookingEngine/handlers/LoadBookingPreHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('LoadBookingPreHandler', () => {
  test('throws when not found', async () => {
    const handler = new LoadBookingPreHandler();
    const ctx = {
      bookingPreId: 'bp1',
      bookingPreModel: { findByPk: jest.fn().mockResolvedValue(null) },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: bookingPre: not found',
    );
  });

  test('loads bookingPre into context', async () => {
    const fake = { id: 'bp1', userId: 'u1' };
    const handler = new LoadBookingPreHandler();
    const ctx = {
      bookingPreId: 'bp1',
      bookingPreModel: { findByPk: jest.fn().mockResolvedValue(fake) },
    } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).bookingPre).toBe(fake);
  });
});
