import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads the user record referenced by the bookingPre and attaches it to the context.
 */
export class LoadUserHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const userId =
      ctx.bookingPre && ctx.bookingPre['userId'] ? ctx.bookingPre['userId'] : null;
    if (userId === null) {
      throw new Error('bookingRouterPostBooking: userId: not found');
    }
    const user = await ctx.userModel.findByPk(userId);
    if (user === null) {
      throw new Error('bookingRouterPostBooking: user: not found');
    }
    ctx.user = user;
  }
}

export default LoadUserHandler;
