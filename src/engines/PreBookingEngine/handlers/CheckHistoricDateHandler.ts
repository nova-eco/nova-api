import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CheckHistoricDateHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { startDate, todayDate } = ctx;
    const isStartDateHistoric =
      startDate && todayDate && startDate.compare
        ? startDate.compare(todayDate) === -1
        : false;

    if (isStartDateHistoric) {
      throw new Error('bookingRouterPostBookingPre: startDate: historic');
    }
  }
}
