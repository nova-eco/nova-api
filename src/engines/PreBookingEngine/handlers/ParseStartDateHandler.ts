import { Temporal } from '@js-temporal/polyfill';
import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class ParseStartDateHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { startDateYear, startDateMonth, startDateMonthDay } = ctx;

    ctx.startDate = Temporal.PlainDate.from(
      {
        year: startDateYear,
        month: startDateMonth,
        day: startDateMonthDay,
      },
      { overflow: 'reject' },
    );

    const todayCalendarFormat = Temporal.Now.plainDateISO();
    ctx.todayDate = Temporal.PlainDate.from(todayCalendarFormat);
  }
}
