import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadStaffHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { staffId } = ctx;
    // Staff model is referenced via serviceModel context or db models in original code
    // We'll access it using the global models by requiring at runtime to keep handler decoupled
    // but router will set ctx.staffModel if needed. For now assume global `Staff` available on ctx as `any`.
    const staffModel: any = (ctx as any).staffModel;
    if (!staffModel)
      throw new Error('bookingRouterPostBookingPre: staff model not provided');

    const staff = await staffModel.findByPk(String(staffId));
    if (staff === null) {
      throw new Error('bookingRouterPostBookingPre: staff: not found');
    }
    ctx.staff = staff;
  }
}
