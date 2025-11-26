import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadSalonOpenHoursHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const salonOpenHourModel = ctx.salonOpenHourModel;
    const salonOpenHours = await salonOpenHourModel.findByCompanyIdWithDetails(
      ctx.companyId as string,
    );
    ctx.response['salonOpenHours'] = salonOpenHours;
  }
}

export default LoadSalonOpenHoursHandler;
