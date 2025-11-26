import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class GetCompanyPreBookingDurationHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { companyModel, companyId } = ctx;
    const companyPreBookingDuration = await companyModel.getCompanyPreBookingDuration(
      companyId as string,
    );

    if (
      !Array.isArray(companyPreBookingDuration) ||
      companyPreBookingDuration.length === 0
    ) {
      throw new Error(
        'bookingRouterPostBookingPre: companyPreBookingDuration: not found',
      );
    }

    ctx.companyPreBookingDuration = companyPreBookingDuration;
  }
}
