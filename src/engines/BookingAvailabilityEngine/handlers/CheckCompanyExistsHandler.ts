import { BookingAvailabilityContext } from '../context';
import { IHandler } from '../handler';

export class CheckCompanyExistsHandler implements IHandler<BookingAvailabilityContext> {
  async handle(ctx: BookingAvailabilityContext) {
    const { companyId, companyModel } = ctx;

    const company = await companyModel.checkCompanyExists(companyId as string);
    if (!company || (Array.isArray(company) && company.length === 0)) {
      throw new Error('bookingRouterGetBookingPre: company: not found');
    }
    // keep company in context for potential use
    (ctx as any).company = company;
  }
}

export default CheckCompanyExistsHandler;
