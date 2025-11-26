import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class GetTimeSlotDurationHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { salonModel, salonId } = ctx;
    const salonTimeSlotDurations = await salonModel.getSalonTimeSlotDuration(
      salonId as string,
    );
    if (!Array.isArray(salonTimeSlotDurations) || salonTimeSlotDurations.length === 0) {
      throw new Error('bookingRouterPostBookingPre: salonTimeSlotDuration: not found');
    }
    ctx.salonTimeSlotDurations = salonTimeSlotDurations;
  }
}
