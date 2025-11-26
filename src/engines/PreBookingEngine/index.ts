import { PreBookingContext } from './context';
import { IHandler } from './handler';
import { CalcStartEndSequenceHandler } from './handlers/CalcStartEndSequenceHandler';
import { CalcValidUntilHandler } from './handlers/CalcValidUntilHandler';
import { CheckChairServiceHandler } from './handlers/CheckChairServiceHandler';
import { CheckHistoricDateHandler } from './handlers/CheckHistoricDateHandler';
import { CheckPreBookingClashesHandler } from './handlers/CheckPreBookingClashesHandler';
import { CheckSalonStaffHandler } from './handlers/CheckSalonStaffHandler';
import { CheckServiceLeadHandler } from './handlers/CheckServiceLeadHandler';
import { CreateBookingPreHandler } from './handlers/CreateBookingPreHandler';
import { GetCompanyPreBookingDurationHandler } from './handlers/GetCompanyPreBookingDurationHandler';
import { GetHaircutDurationHandler } from './handlers/GetHaircutDurationHandler';
import { GetTimeSlotDurationHandler } from './handlers/GetTimeSlotDurationHandler';
import { GetTimeSlotIdsHandler } from './handlers/GetTimeSlotIdsHandler';
import { LoadCompanyHandler } from './handlers/LoadCompanyHandler';
import { LoadSalonHandler } from './handlers/LoadSalonHandler';
import { LoadSeatHandler } from './handlers/LoadSeatHandler';
import { LoadServiceHandler } from './handlers/LoadServiceHandler';
import { LoadStaffHandler } from './handlers/LoadStaffHandler';
import { LoadUserHandler } from './handlers/LoadUserHandler';
import { ParseStartDateHandler } from './handlers/ParseStartDateHandler';
import { ValidateParamsHandler } from './handlers/ValidateParamsHandler';

export class PreBookingEngine {
  private handlers: IHandler<PreBookingContext>[] = [];

  register(handler: IHandler<PreBookingContext>) {
    this.handlers.push(handler);
    return this;
  }

  async process(ctx: PreBookingContext) {
    for (const h of this.handlers) {
      await h.handle(ctx);
    }
    return ctx;
  }

  static defaultChain(): PreBookingEngine {
    const e = new PreBookingEngine();

    e.register(new ValidateParamsHandler())
      .register(new ParseStartDateHandler())
      .register(new LoadServiceHandler())
      .register(new LoadCompanyHandler())
      .register(new LoadStaffHandler())
      .register(new LoadUserHandler())
      .register(new LoadSalonHandler())
      .register(new LoadSeatHandler())
      .register(new CheckChairServiceHandler())
      .register(new CheckSalonStaffHandler())
      .register(new CheckServiceLeadHandler())
      .register(new CheckHistoricDateHandler())
      .register(new CheckPreBookingClashesHandler())
      .register(new GetHaircutDurationHandler())
      .register(new GetTimeSlotDurationHandler())
      .register(new CalcStartEndSequenceHandler())
      .register(new GetTimeSlotIdsHandler())
      .register(new GetCompanyPreBookingDurationHandler())
      .register(new CalcValidUntilHandler())
      .register(new CreateBookingPreHandler());

    return e;
  }
}
