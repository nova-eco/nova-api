import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Load bookingPre by primary key and attach to context.
 */
export class LoadBookingPreHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const bookingPreId = (ctx as any).bookingPreId;
    const bookingPre = await ctx.bookingPreModel.findByPk(bookingPreId);
    if (bookingPre === null) {
      throw new Error('bookingRouterPostBooking: bookingPre: not found');
    }
    ctx.bookingPre = bookingPre;
  }
}

export default LoadBookingPreHandler;
