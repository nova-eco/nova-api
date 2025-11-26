import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Creates the order + orderServicePrice + orderBalance + booking records
 * and stores resulting entities on the context for downstream handlers.
 */
/**
 * Creates the order and booking rows required for completing a booking.
 * Attaches resulting `order` and `booking` objects to the context for later handlers.
 */
export class CreateOrderAndBookingFlowHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const userId = ctx.user && ctx.user['id'] ? ctx.user['id'] : null;
    if (userId === null) {
      throw new Error('bookingRouterPostBooking: userId: not found');
    }

    const orderTimestamp = Date.now();
    const order = await ctx.orderModel.create({ userId, orderTimestamp });
    if (order === null) {
      throw new Error('bookingRouterPostBooking: order: not created');
    }
    ctx.order = order;

    const orderId = order['id'] ? order['id'] : null;
    if (orderId === null) {
      throw new Error('bookingRouterPostBooking: orderId: not created');
    }

    const orderServicePrice = await ctx.orderServicePriceModel.create({
      servicePriceId: ctx.servicePrice['id'],
      orderId,
    });
    if (orderServicePrice === null) {
      throw new Error('bookingRouterPostBooking: orderServicePrice: not created');
    }
    ctx.orderServicePrice = orderServicePrice;

    const orderBalanceStart =
      typeof ctx.servicePrice['price'] !== 'undefined' ? ctx.servicePrice['price'] : null;
    if (orderBalanceStart === null) {
      throw new Error('bookingRouterPostBooking: orderBalanceStart: not found');
    }

    const orderBalance = await ctx.orderBalanceModel.create({
      orderId,
      balance: orderBalanceStart,
    });
    if (orderBalance === null) {
      throw new Error('bookingRouterPostBooking: orderBalance: not created');
    }
    ctx.orderBalance = orderBalance;

    const booking = await ctx.bookingModel.create({
      bookingPreId: ctx.bookingPre['id'],
      servicePriceId: ctx.servicePrice['id'],
      orderId,
    });
    if (booking === null) {
      throw new Error('bookingRouterPostBooking: booking not created');
    }
    ctx.booking = booking;

    const bookingId = booking['id'] ? booking['id'] : null;
    if (bookingId === null) {
      throw new Error('bookingRouterPostBooking: bookingId: not found');
    }

    (ctx as any).bookingId = bookingId;
  }
}

export default CreateOrderAndBookingFlowHandler;
