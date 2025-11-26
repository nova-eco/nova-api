import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Verifies that the bookingPre's `validUntilTimestamp` is present and in the future.
 */
export class ValidateValidUntilHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const validUntilTimestamp =
      ctx.bookingPre && ctx.bookingPre['validUntilTimestamp']
        ? ctx.bookingPre['validUntilTimestamp']
        : null;
    if (validUntilTimestamp === null) {
      throw new Error('bookingRouterPostBooking: validUntilTimestamp: not found.');
    }
    const currentTimestamp = Date.now();
    if (validUntilTimestamp <= currentTimestamp) {
      throw new Error('bookingRouterPostBookingPre: validUntilTimestamp: invalid');
    }
  }
}

export default ValidateValidUntilHandler;
