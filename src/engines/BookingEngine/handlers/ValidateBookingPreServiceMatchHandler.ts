import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Ensures the serviceId stored on `bookingPre` matches the serviceId
 * derived from the provided servicePrice.
 */
export class ValidateBookingPreServiceMatchHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const bookingPreServiceId =
      ctx.bookingPre && ctx.bookingPre['serviceId'] ? ctx.bookingPre['serviceId'] : null;
    if (bookingPreServiceId === null) {
      throw new Error('bookingRouterPostBooking: bookingPreServiceId: not found');
    }
    if (bookingPreServiceId !== (ctx as any).serviceId) {
      throw new Error('bookingRouterPostBooking: serviceId: invalid');
    }
  }
}

export default ValidateBookingPreServiceMatchHandler;
