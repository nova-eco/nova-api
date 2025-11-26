import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Validate that the request body contains `bookingPreId` and store it on context.
 */
export class ValidateBookingPreIdHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const { body } = ctx;
    const bookingPreId =
      typeof body['bookingPreId'] !== 'undefined' ? body['bookingPreId'] : null;
    if (bookingPreId === null) {
      throw new Error('bookingRouterPostBooking: bookingPreId: not found');
    }
    (ctx as any).bookingPreId = bookingPreId;
  }
}

export default ValidateBookingPreIdHandler;
