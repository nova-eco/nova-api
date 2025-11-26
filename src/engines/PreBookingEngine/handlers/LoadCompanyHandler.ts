import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadCompanyHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { companyId, companyModel } = ctx;
    const company = await companyModel.findByPk(String(companyId));
    if (company === null) {
      throw new Error('bookingRouterPostBookingPre: company: not found');
    }
    ctx.company = company;
  }
}
