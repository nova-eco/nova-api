import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadServiceHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { serviceId, serviceModel } = ctx;
    const service = await serviceModel.findByPk(String(serviceId));
    if (service === null) {
      throw new Error('bookingRouterPostBookingPre: service: not found');
    }
    ctx.service = service;
    ctx.companyId =
      typeof service['companyId'] !== 'undefined' ? service['companyId'] : null;
    if (ctx.companyId === null) {
      throw new Error('bookingRouterPostBookingPre: companyId: not found');
    }
  }
}
