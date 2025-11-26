import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CheckPreBookingClashesHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const {
      bookingPreModel,
      seatId,
      staffId,
      userId,
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      salonTimeSlotSequenceNumber,
    } = ctx;

    const potentialPreBookingChairClashes =
      await bookingPreModel.findPreBookingChairClashes(
        seatId as string,
        startDateYear as number,
        startDateMonth as number,
        startDateMonthDay as number,
        salonTimeSlotSequenceNumber as number,
      );

    if (potentialPreBookingChairClashes.length > 0) {
      throw new Error(
        'bookingRouterPostBookingPre: potentialPreBookingChairClashes: found',
      );
    }

    const potentialPreBookingStaffClashes =
      await bookingPreModel.findPreBookingStaffClashes(
        staffId as string,
        startDateYear as number,
        startDateMonth as number,
        startDateMonthDay as number,
        salonTimeSlotSequenceNumber as number,
      );

    if (potentialPreBookingStaffClashes.length > 0) {
      throw new Error(
        'bookingRouterPostBookingPre: potentialPreBookingStaffClashes: found',
      );
    }

    const potentialPreBookingUserClashes =
      await bookingPreModel.findPreBookingUserClashes(
        userId as string,
        startDateYear as number,
        startDateMonth as number,
        startDateMonthDay as number,
        salonTimeSlotSequenceNumber as number,
      );

    if (potentialPreBookingUserClashes.length > 0) {
      throw new Error(
        'bookingRouterPostBookingPre: potentialPreBookingUserClashes: found',
      );
    }
  }
}
