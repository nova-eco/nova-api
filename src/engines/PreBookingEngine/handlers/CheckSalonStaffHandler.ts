import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CheckSalonStaffHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { salonId, staffId } = ctx;
    const salonModel: any = (ctx as any).salonModel;
    if (!salonModel)
      throw new Error('bookingRouterPostBookingPre: salon model not provided');

    const salonStaff = await salonModel.checkSalonStaff(salonId, staffId);
    if (!Array.isArray(salonStaff) || salonStaff.length === 0) {
      throw new Error('bookingRouterPostBookingPre: salonStaff: not found');
    }
  }
}
