import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads available currencies and attaches them to the response object.
 */
export class LoadCurrenciesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const Currency = models.Currency;
    const currencies = await Currency.findAll({
      attributes: ['id', 'name', 'abbreviation', 'symbol'],
    });
    ctx.response['currencies'] = currencies.map((c: any) => c.toJSON());
  }
}

export default LoadCurrenciesHandler;
