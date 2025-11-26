import { BookingContext } from './context';
import { IHandler } from './handler';
import CheckAppointmentClashHandler from './handlers/CheckAppointmentClashHandler';
import CreateAppointmentAndChildrenHandler from './handlers/CreateAppointmentAndChildrenHandler';
import CreateOrderAndBookingFlowHandler from './handlers/CreateOrderAndBookingFlowHandler';
import LoadBookingPreHandler from './handlers/LoadBookingPreHandler';
import LoadServiceHandler from './handlers/LoadServiceHandler';
import LoadServiceLeadAndStaffHandler from './handlers/LoadServiceLeadAndStaffHandler';
import LoadUserHandler from './handlers/LoadUserHandler';
import ValidateBookingPreIdHandler from './handlers/ValidateBookingPreIdHandler';
import ValidateBookingPreServiceMatchHandler from './handlers/ValidateBookingPreServiceMatchHandler';
import ValidateServicePriceHandler from './handlers/ValidateServicePriceHandler';
import ValidateValidUntilHandler from './handlers/ValidateValidUntilHandler';

export class BookingEngine {
  private handlers: IHandler<BookingContext>[] = [];

  constructor(handlers?: IHandler<BookingContext>[]) {
    if (handlers) this.handlers = handlers;
  }

  async run(ctx: BookingContext) {
    for (const handler of this.handlers) {
      await handler.handle(ctx as BookingContext);
    }
    return ctx;
  }

  static defaultChain(models?: any) {
    const handlers: IHandler<BookingContext>[] = [
      new ValidateBookingPreIdHandler(),
      new LoadBookingPreHandler(),
      new ValidateServicePriceHandler(),
      new LoadServiceHandler(),
      new LoadUserHandler(),
      new ValidateBookingPreServiceMatchHandler(),
      new ValidateValidUntilHandler(),
      new CreateOrderAndBookingFlowHandler(),
      new LoadServiceLeadAndStaffHandler(),
      new CheckAppointmentClashHandler(),
      new CreateAppointmentAndChildrenHandler(),
    ];

    return new BookingEngine(handlers);
  }
}

export default BookingEngine;
