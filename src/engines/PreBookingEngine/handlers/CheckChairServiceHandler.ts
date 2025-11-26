import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CheckChairServiceHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { serviceId, seatId } = ctx;
    const chairServiceModel: any = (ctx as any).chairServiceModel;
    if (!chairServiceModel)
      throw new Error('bookingRouterPostBookingPre: chairService model not provided');

    const chairServices = await chairServiceModel.count({ serviceId, seatId });
    if (chairServices === 0) {
      throw new Error('bookingRouterPostBookingPre: chairService: not found');
    }
  }
}
