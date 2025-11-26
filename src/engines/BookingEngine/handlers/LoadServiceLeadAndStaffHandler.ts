import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads the service lead record for a service and then loads the staff
 * member referenced by that lead.
 */
export class LoadServiceLeadAndStaffHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const serviceId = ctx.service && ctx.service['id'] ? ctx.service['id'] : null;
    const serviceLead = await ctx.serviceLeadModel.findOne({ serviceId });
    if (serviceLead === null) {
      throw new Error('bookingRouterPostBooking: serviceLead: not found');
    }
    ctx.serviceLead = serviceLead;

    const staffId =
      typeof serviceLead['staffId'] !== 'undefined' ? serviceLead['staffId'] : null;
    if (staffId === null) {
      throw new Error('bookingRouterPostBooking: staffId: not found');
    }

    const staff = await ctx.staffModel.findByPk(staffId);
    if (staff === null) {
      throw new Error('bookingRouterPostBooking: staff: not found');
    }
    ctx.staff = staff;
  }
}

export default LoadServiceLeadAndStaffHandler;
