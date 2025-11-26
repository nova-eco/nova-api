import { BookingAvailabilityContext } from '../context';
import { IHandler } from '../handler';

export class GetPreBookingsHandler implements IHandler<BookingAvailabilityContext> {
  async handle(ctx: BookingAvailabilityContext) {
    const { companyId, bookingPreModel } = ctx;
    const preBookings = await bookingPreModel.getPreBookingsByCompany(
      companyId as string,
    );
    ctx.result = preBookings;
  }
}

export default GetPreBookingsHandler;
