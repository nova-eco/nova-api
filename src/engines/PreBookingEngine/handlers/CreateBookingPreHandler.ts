import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CreateBookingPreHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const {
      bookingPreModel,
      serviceId,
      staffId,
      userId,
      salonId,
      seatId,
      startDateMonth,
      startDateMonthDay,
      startDateYear,
      salonStartEndTimeSlotIds,
      validUntilTimestampSeconds,
    } = ctx;

    const bookingPre = await bookingPreModel.create({
      serviceId,
      endSalonTimeSlotId: salonStartEndTimeSlotIds![0]['endSalonTimeSlotId'],
      staffId,
      startSalonTimeSlotId: salonStartEndTimeSlotIds![0]['startSalonTimeSlotId'],
      userId,
      salonId,
      seatId,
      startDateMonth,
      startDateMonthDay,
      startDateYear,
      validUntilTimestampSeconds,
    } as any);

    if (bookingPre === null) {
      throw new Error('bookingRouterPostBookingPre: booking not created');
    }

    // Convert to JSON and match original router behavior
    const bookingPreJSON = bookingPre.toJSON ? bookingPre.toJSON() : bookingPre;
    const response = { ...bookingPreJSON };
    delete response['createdAt'];
    delete response['updateAt'];

    ctx.result = response;
  }
}
