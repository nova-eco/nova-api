import { CheckAppointmentClashHandler } from '../../../../src/engines/BookingEngine/handlers/CheckAppointmentClashHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('CheckAppointmentClashHandler', () => {
  test('throws when clash found', async () => {
    const handler = new CheckAppointmentClashHandler();
    const ctx = {
      appointmentModel: { checkAppointmentClash: jest.fn().mockResolvedValue([{}]) },
      staff: { id: 'st1' },
      bookingId: 'b1',
    } as unknown as BookingContext;
    (ctx as any).bookingId = 'b1';
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: potentialAppointmentClash: found',
    );
  });

  test('does not throw when no clash', async () => {
    const handler = new CheckAppointmentClashHandler();
    const ctx = {
      appointmentModel: { checkAppointmentClash: jest.fn().mockResolvedValue([]) },
      staff: { id: 'st1' },
    } as unknown as BookingContext;
    (ctx as any).bookingId = 'b1';
    await expect(handler.handle(ctx)).resolves.toBeUndefined();
  });
});
