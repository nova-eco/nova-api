import { LoadUserHandler } from '../../../../src/engines/BookingEngine/handlers/LoadUserHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('LoadUserHandler', () => {
  test('throws when userId missing from bookingPre', async () => {
    const handler = new LoadUserHandler();
    const ctx = { bookingPre: {} } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: userId: not found',
    );
  });

  test('throws when user not found', async () => {
    const handler = new LoadUserHandler();
    const ctx = {
      bookingPre: { userId: 'u1' },
      userModel: { findByPk: jest.fn().mockResolvedValue(null) },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: user: not found',
    );
  });

  test('loads user into context', async () => {
    const handler = new LoadUserHandler();
    const fake = { id: 'u1', name: 'Alice' };
    const ctx = {
      bookingPre: { userId: 'u1' },
      userModel: { findByPk: jest.fn().mockResolvedValue(fake) },
    } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).user).toBe(fake);
  });
});
