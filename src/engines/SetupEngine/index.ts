import { SetupContext } from './context';
import { IHandler } from './handler';
import LoadBookingCompletionRulesHandler from './handlers/LoadBookingCompletionRulesHandler';
import LoadCurrenciesHandler from './handlers/LoadCurrenciesHandler';
import LoadHaircutPricesHandler from './handlers/LoadHaircutPricesHandler';
import LoadHaircutsHandler from './handlers/LoadHaircutsHandler';
import LoadPriceTypesHandler from './handlers/LoadPriceTypesHandler';
import LoadRegistrationsHandler from './handlers/LoadRegistrationsHandler';
import LoadSalonOpenHoursHandler from './handlers/LoadSalonOpenHoursHandler';
import LoadSeatsAndHaircutIdsHandler from './handlers/LoadSeatsAndHaircutIdsHandler';
import LoadSeatTypesHandler from './handlers/LoadSeatTypesHandler';
import LoadServicePeriodRoleTypesHandler from './handlers/LoadServicePeriodRoleTypesHandler';
import LoadServicePeriodsHandler from './handlers/LoadServicePeriodsHandler';
import LoadStaffAndSalonsHandler from './handlers/LoadStaffAndSalonsHandler';
import LoadStaffRolesHandler from './handlers/LoadStaffRolesHandler';
import LoadTemporalDurationsHandler from './handlers/LoadTemporalDurationsHandler';
import LoadUserSessionHandler from './handlers/LoadUserSessionHandler';
import ValidateUserHandler from './handlers/ValidateUserHandler';

export class SetupEngine {
  private handlers: IHandler<SetupContext>[] = [];

  constructor(handlers?: IHandler<SetupContext>[]) {
    if (handlers) this.handlers = handlers;
  }

  async run(ctx: SetupContext) {
    for (const handler of this.handlers) {
      await handler.handle(ctx as SetupContext);
    }
    return ctx;
  }

  static defaultChain(models: any) {
    // models contains pre-instantiated model classes used by handlers
    const handlers = [
      new ValidateUserHandler(),
      new LoadUserSessionHandler(),
      new LoadSeatsAndHaircutIdsHandler(),
      new LoadSeatTypesHandler(),
      new LoadHaircutsHandler(),
      new LoadBookingCompletionRulesHandler(),
      new LoadPriceTypesHandler(),
      new LoadHaircutPricesHandler(),
      new LoadServicePeriodRoleTypesHandler(),
      new LoadServicePeriodsHandler(),
      new LoadStaffRolesHandler(),
      new LoadStaffAndSalonsHandler(),
      new LoadTemporalDurationsHandler(),
      new LoadSalonOpenHoursHandler(),
      new LoadCurrenciesHandler(),
      new LoadRegistrationsHandler(),
    ];

    return new SetupEngine(handlers);
  }
}

export default SetupEngine;
