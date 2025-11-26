import { ValidateParamsHandler } from '../../../../src/engines/BookingAvailabilityEngine/handlers/ValidateParamsHandler';
import { BookingAvailabilityContext } from '../../../../src/engines/BookingAvailabilityEngine/context';

describe('ValidateParamsHandler', () => {
  test('throws if companyId missing', async () => {
    const handler = new ValidateParamsHandler();
    const ctx = { params: {} } as unknown as BookingAvailabilityContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterGetBookingPre: companyId: not found',
    );
  });

  test('sets companyId on context', async () => {
    const handler = new ValidateParamsHandler();
    const ctx = { params: { companyId: 'c1' } } as unknown as BookingAvailabilityContext;
    await handler.handle(ctx);
    expect(ctx.companyId).toBe('c1');
  });
});
