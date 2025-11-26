import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadPriceTypesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const ServicePriceType = models.ServicePriceType;
    const priceTypes = await ServicePriceType.findAll({
      attributes: ['id', 'description', 'name'],
    });
    ctx.response['haircutPriceTypes'] = priceTypes.map((p: any) => p.toJSON());
  }
}

export default LoadPriceTypesHandler;
