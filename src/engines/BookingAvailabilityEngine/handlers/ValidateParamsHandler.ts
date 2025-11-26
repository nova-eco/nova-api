import { BookingAvailabilityContext } from '../context';
import { IHandler } from '../handler';

export class ValidateParamsHandler implements IHandler<BookingAvailabilityContext> {
  async handle(ctx: BookingAvailabilityContext) {
    const { params } = ctx;
    const companyId =
      typeof params['companyId'] !== 'undefined' ? params['companyId'] : null;
    if (companyId === null) {
      throw new Error('bookingRouterGetBookingPre: companyId: not found');
    }
    ctx.companyId = companyId;
  }
}

export default ValidateParamsHandler;
