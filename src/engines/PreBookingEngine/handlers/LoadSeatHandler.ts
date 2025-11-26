import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadSeatHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { seatId, salonId } = ctx;
    const seatModel: any = (ctx as any).seatModel;
    if (!seatModel)
      throw new Error('bookingRouterPostBookingPre: seat model not provided');

    const seat = await seatModel.findByPk(String(seatId));
    if (seat === null) {
      throw new Error('bookingRouterPostBookingPre: seat: not found');
    }

    if (seat.salonId !== salonId) {
      throw new Error('bookingRouterPostBookingPre: seat: invalid');
    }

    ctx.seat = seat;
  }
}
