import { ValidateBookingPreIdHandler } from '../../../../src/engines/BookingEngine/handlers/ValidateBookingPreIdHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('ValidateBookingPreIdHandler', () => {
  test('throws if bookingPreId missing', async () => {
    const handler = new ValidateBookingPreIdHandler();
    const ctx = { body: {} } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: bookingPreId: not found',
    );
  });

  test('sets bookingPreId on context', async () => {
    const handler = new ValidateBookingPreIdHandler();
    const ctx = { body: { bookingPreId: 'bp1' } } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).bookingPreId).toBe('bp1');
  });
});
