import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CheckServiceLeadHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { serviceId, serviceModel, staffId } = ctx;
    const staffLead = await serviceModel.getServiceLead(serviceId as string);
    if (
      Array.isArray(staffLead) &&
      staffLead.length > 0 &&
      staffLead[0].staffId !== staffId
    ) {
      throw new Error('bookingRouterPostBookingPre: staffLead: invalid');
    }
  }
}
