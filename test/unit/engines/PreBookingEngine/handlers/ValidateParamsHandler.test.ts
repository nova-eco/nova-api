import { ValidateParamsHandler } from '../../../../../src/engines/PreBookingEngine/handlers/ValidateParamsHandler';
import { PreBookingContext } from '../../../../../src/engines/PreBookingEngine/context';

describe('ValidateParamsHandler', () => {
  test('populates context when all params present', async () => {
    const handler = new ValidateParamsHandler();
    const ctx: Partial<PreBookingContext> = {
      body: {
        serviceId: 's1',
        staffId: 't1',
        startDateYear: 2025,
        startDateMonth: 12,
        startDateMonthDay: 5,
        userId: 'u1',
        salonId: 'sal1',
        seatId: 'seat1',
        salonTimeSlotSequenceNumber: 3,
      },
    };

    await handler.handle(ctx as PreBookingContext);

    expect(ctx.serviceId).toBe('s1');
    expect(ctx.staffId).toBe('t1');
    expect(ctx.startDateYear).toBe(2025);
    expect(ctx.salonTimeSlotSequenceNumber).toBe(3);
  });

  test('throws when missing param', async () => {
    const handler = new ValidateParamsHandler();
    const ctx: Partial<PreBookingContext> = { body: { serviceId: 's1' } };
    await expect(handler.handle(ctx as PreBookingContext)).rejects.toThrow(
      'bookingRouterPostBookingPre: staffId: not found',
    );
  });
});
