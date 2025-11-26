import { ValidateServicePriceHandler } from '../../../../src/engines/BookingEngine/handlers/ValidateServicePriceHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('ValidateServicePriceHandler', () => {
  test('throws when servicePriceId missing', async () => {
    const handler = new ValidateServicePriceHandler();
    const ctx = { body: {} } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: servicePriceId: not found',
    );
  });

  test('throws when servicePrice not found', async () => {
    const handler = new ValidateServicePriceHandler();
    const ctx = {
      body: { servicePriceId: 'sp1' },
      servicePriceModel: { findByPk: jest.fn().mockResolvedValue(null) },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: servicePrice: not found',
    );
  });

  test('loads servicePrice and serviceId', async () => {
    const handler = new ValidateServicePriceHandler();
    const fake = { id: 'sp1', serviceId: 's1' };
    const ctx = {
      body: { servicePriceId: 'sp1' },
      servicePriceModel: { findByPk: jest.fn().mockResolvedValue(fake) },
    } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).servicePrice).toBe(fake);
    expect((ctx as any).serviceId).toBe('s1');
  });
});
