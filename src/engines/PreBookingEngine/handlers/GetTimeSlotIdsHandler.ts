import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class GetTimeSlotIdsHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { salonModel } = ctx;
    const start = (ctx as any).startSalonTimeSlotSequenceNumber;
    const end = (ctx as any).endSalonTimeSlotSequenceNumber;
    const salonId = ctx.salonId;

    const salonStartEndTimeSlotIds = await salonModel.getSalonStartEndTimeSlotIds(
      salonId as string,
      start as number,
      end as number,
    );

    if (
      !Array.isArray(salonStartEndTimeSlotIds) ||
      salonStartEndTimeSlotIds.length === 0
    ) {
      throw new Error('bookingRouterPostBookingPre: salonStartEndTimeSlotIds: not found');
    }

    ctx.salonStartEndTimeSlotIds = salonStartEndTimeSlotIds;
  }
}
