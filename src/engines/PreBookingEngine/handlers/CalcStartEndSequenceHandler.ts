import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CalcStartEndSequenceHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { haircutDurations, salonTimeSlotDurations, salonTimeSlotSequenceNumber } = ctx;

    const haircutDuration = haircutDurations![0]['durationMins'];
    const salonTimeSlotDuration = salonTimeSlotDurations![0]['durationMins'];

    let startSalonTimeSlotSequenceNumber: number;
    let endSalonTimeSlotSequenceNumber: number;

    if (haircutDuration <= salonTimeSlotDuration) {
      startSalonTimeSlotSequenceNumber = salonTimeSlotSequenceNumber as number;
      endSalonTimeSlotSequenceNumber = salonTimeSlotSequenceNumber as number;
    } else {
      startSalonTimeSlotSequenceNumber = salonTimeSlotSequenceNumber as number;
      const increment = Math.round(haircutDuration / salonTimeSlotDuration);
      endSalonTimeSlotSequenceNumber =
        (salonTimeSlotSequenceNumber as number) + increment;
    }

    (ctx as any).startSalonTimeSlotSequenceNumber = startSalonTimeSlotSequenceNumber;
    (ctx as any).endSalonTimeSlotSequenceNumber = endSalonTimeSlotSequenceNumber;
  }
}
