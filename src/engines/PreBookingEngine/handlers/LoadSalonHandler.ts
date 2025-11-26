import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadSalonHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { salonId, companyId } = ctx;
    const salonModel: any = (ctx as any).salonModel;
    if (!salonModel)
      throw new Error('bookingRouterPostBookingPre: salon model not provided');

    const salon = await salonModel.findByPk(String(salonId));
    if (salon === null) {
      throw new Error('bookingRouterPostBookingPre: salon: not found');
    }

    if (salon.companyId !== companyId) {
      throw new Error('bookingRouterPostBookingPre: salon: invalid');
    }

    ctx.salon = salon;
  }
}
