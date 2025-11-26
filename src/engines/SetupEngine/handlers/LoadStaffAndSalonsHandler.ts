import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadStaffAndSalonsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const staffModel = ctx.staffModel;
    const salonModel = ctx.salonModel;
    const seatModel = ctx.seatModel;
    const salonOpenHourModel = ctx.salonOpenHourModel;

    const companyId = ctx.companyId as string;

    const companyStaff = await staffModel.findByCompanyId(companyId);
    const companyStaffWithExtraFields = companyStaff.map((cs: any) => ({
      ...cs,
      haircutIds: [],
    }));
    ctx.response['staff'] = companyStaffWithExtraFields;

    const salons = await salonModel.findByCompanyId(companyId);

    for (const salon of salons) {
      const { id } = salon;
      const seatIds = await seatModel.findIdsBySalonId(id);
      salon['seatIds'] = seatIds.map((seatId: any) => ({ id: seatId }));
    }

    for (const salon of salons) {
      const { id } = salon;
      const salonStaffIds = await salonModel.getStaffIds(id);
      salon['staffIds'] = salonStaffIds;
    }

    for (const salon of salons) {
      const { id } = salon;
      const openHourIds = await salonOpenHourModel.findIdsBySalonId(id);
      salon['salonOpenHourIds'] = openHourIds;
    }

    ctx.response['salons'] = salons;
  }
}

export default LoadStaffAndSalonsHandler;
