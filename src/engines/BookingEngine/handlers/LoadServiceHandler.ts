import { BookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadServiceHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const serviceId = (ctx as any).serviceId;
    const service = await ctx.serviceModel.findByPk(serviceId);
    if (service === null) {
      throw new Error('bookingRouterPostBooking: service: not found');
    }
    ctx.service = service;
  }
}

export default LoadServiceHandler;
