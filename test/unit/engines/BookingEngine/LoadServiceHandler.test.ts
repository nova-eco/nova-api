import { LoadServiceHandler } from '../../../../src/engines/BookingEngine/handlers/LoadServiceHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('LoadServiceHandler', () => {
  test('throws when service not found', async () => {
    const handler = new LoadServiceHandler();
    const ctx = {
      serviceId: 's1',
      serviceModel: { findByPk: jest.fn().mockResolvedValue(null) },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: service: not found',
    );
  });

  test('loads service into context', async () => {
    const handler = new LoadServiceHandler();
    const fake = { id: 's1', name: 'Haircut' };
    const ctx = {
      serviceId: 's1',
      serviceModel: { findByPk: jest.fn().mockResolvedValue(fake) },
    } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).service).toBe(fake);
  });
});
