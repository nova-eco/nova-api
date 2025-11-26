import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class GetHaircutDurationHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { serviceModel, serviceId } = ctx;
    const haircutDurations = await serviceModel.getServiceDuration(serviceId as string);
    if (!Array.isArray(haircutDurations) || haircutDurations.length === 0) {
      throw new Error('bookingRouterPostBookingPre: haircutDuration: not found');
    }
    ctx.haircutDurations = haircutDurations;
  }
}
