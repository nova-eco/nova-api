import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Validates `servicePriceId` present in request body, loads the servicePrice
 * record and stores `servicePrice` and `serviceId` on the context.
 */
export class ValidateServicePriceHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const { body } = ctx;
    const servicePriceId =
      typeof body['servicePriceId'] !== 'undefined' ? body['servicePriceId'] : null;
    if (servicePriceId === null) {
      throw new Error('bookingRouterPostBooking: servicePriceId: not found');
    }
    const servicePrice = await ctx.servicePriceModel.findByPk(servicePriceId);
    if (servicePrice === null) {
      throw new Error('bookingRouterPostBooking: servicePrice: not found');
    }
    ctx.servicePrice = servicePrice;
    const serviceId =
      typeof servicePrice['serviceId'] !== 'undefined' ? servicePrice['serviceId'] : null;
    if (serviceId === null) {
      throw new Error('bookingRouterPostBooking: serviceId: not found');
    }
    (ctx as any).serviceId = serviceId;
  }
}

export default ValidateServicePriceHandler;
