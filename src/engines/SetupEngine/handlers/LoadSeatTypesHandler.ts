import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadSeatTypesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const db = (await import('@app/core/api/Db')).Db.getDb();
    const { models } = db as any;
    const SeatType = models.SeatType;
    const seatTypes = await SeatType.findAll({
      attributes: ['id', 'description', 'name'],
    });
    ctx.response['seatTypes'] = seatTypes.map((s: any) => s.toJSON());
  }
}

export default LoadSeatTypesHandler;
