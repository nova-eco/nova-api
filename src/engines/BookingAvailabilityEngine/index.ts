import { BookingAvailabilityContext } from './context';
import { IHandler } from './handler';
import CheckCompanyExistsHandler from './handlers/CheckCompanyExistsHandler';
import GetPreBookingsHandler from './handlers/GetPreBookingsHandler';
import ValidateParamsHandler from './handlers/ValidateParamsHandler';

export class BookingAvailabilityEngine {
  private handlers: IHandler<BookingAvailabilityContext>[] = [];

  constructor(handlers?: IHandler<BookingAvailabilityContext>[]) {
    if (handlers) this.handlers = handlers;
  }

  async run(ctx: BookingAvailabilityContext) {
    for (const handler of this.handlers) {
      await handler.handle(ctx);
    }
    return ctx;
  }

  static defaultChain() {
    return new BookingAvailabilityEngine([
      new ValidateParamsHandler(),
      new CheckCompanyExistsHandler(),
      new GetPreBookingsHandler(),
    ]);
  }
}

export default BookingAvailabilityEngine;
