import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class LoadUserHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const { userId } = ctx;
    const userModel: any = (ctx as any).userModel;
    if (!userModel)
      throw new Error('bookingRouterPostBookingPre: user model not provided');

    const user = await userModel.findByPk(String(userId));
    if (user === null) {
      throw new Error('bookingRouterPostBookingPre: user: not found');
    }
    ctx.user = user;
  }
}
