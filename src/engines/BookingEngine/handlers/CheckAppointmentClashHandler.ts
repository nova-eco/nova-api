import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Calls the appointmentModel to check for appointment clashes for the staff
 * and throws if any potential clash is found.
 */
export class CheckAppointmentClashHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const bookingId = (ctx as any).bookingId;
    const staffId = ctx.staff && ctx.staff['id'] ? ctx.staff['id'] : null;
    const appointmentClashResults = await ctx.appointmentModel.checkAppointmentClash(
      bookingId,
      staffId,
    );
    const potentialAppointmentClash = appointmentClashResults[0] || null;
    if (potentialAppointmentClash !== null) {
      throw new Error('bookingRouterPostBooking: potentialAppointmentClash: found');
    }
  }
}

export default CheckAppointmentClashHandler;
