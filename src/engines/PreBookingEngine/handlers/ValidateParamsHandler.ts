import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class ValidateParamsHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { body } = ctx;
    const require = (name: string) => {
      const val = typeof body[name] !== 'undefined' ? body[name] : null;
      if (val === null)
        throw new Error(`bookingRouterPostBookingPre: ${name}: not found`);
      return val;
    };

    ctx.serviceId = String(require('serviceId'));
    ctx.staffId = String(require('staffId'));
    ctx.startDateYear = Number(require('startDateYear'));
    ctx.startDateMonth = Number(require('startDateMonth'));
    ctx.startDateMonthDay = Number(require('startDateMonthDay'));
    ctx.userId = String(require('userId'));
    ctx.salonId = String(require('salonId'));
    ctx.seatId = String(require('seatId'));
    ctx.salonTimeSlotSequenceNumber = Number(require('salonTimeSlotSequenceNumber'));
  }
}
