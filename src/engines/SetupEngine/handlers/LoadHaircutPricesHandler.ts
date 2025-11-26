import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads haircut price entries and attaches them to `ctx.response.haircutPrices`.
 */
export class LoadHaircutPricesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const ServicePrice = models.ServicePrice;
    const Service = models.Service;
    const Company = models.Company;

    const prices = await ServicePrice.findAll({
      attributes: [
        'id',
        'servicePriceTypeId',
        'currencyId',
        'priceMajorUnitValue',
        'priceMinorUnitValue',
      ],
      include: [
        {
          model: Service,
          required: true,
          attributes: [],
          include: [{ model: Company, required: true, attributes: [] }],
        },
      ],
    });

    ctx.response['haircutPrices'] = prices;
  }
}

export default LoadHaircutPricesHandler;
