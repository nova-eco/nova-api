import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads company services (haircuts) and augments each with seatIds, price ids,
 * stage ids and booking completion rule ids.
 */
export class LoadHaircutsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const {
      Service,
      Product,
      ServicePrice,
      ServicePeriod,
      ServiceBookingCompletionRequirement,
      Company,
    } = models;
    const companyId = ctx.companyId as string;

    const services = await Service.findAll({
      attributes: [
        'id',
        'companyId',
        [db.col('Product.description'), 'description'],
        [db.col('Product.name'), 'name'],
      ],
      where: { companyId },
      include: [{ model: Product, required: true, attributes: [] }],
    });

    const haircuts = services.map((s: any) => s.toJSON());

    // 11.b seatIds
    const seats = ctx.response['seats'] || [];
    for (const haircut of haircuts) {
      const haircutId = haircut.id;
      haircut['seatIds'] = seats.reduce((acc: any[], seat: any) => {
        const { haircutIds } = seat;
        if (Array.isArray(haircutIds) && haircutIds.includes(haircutId)) {
          acc.push(seat.id);
        }
        return acc;
      }, []);
    }

    // 11.c price ids
    for (const haircut of haircuts) {
      const haircutId = haircut.id;
      const pricesPerHaircut = await ServicePrice.findAll({
        attributes: ['id'],
        include: [
          { model: Service, required: true, attributes: [], where: { id: haircutId } },
        ],
      });
      haircut['haircutPriceIds'] = pricesPerHaircut.map((p: any) => p.id);
    }

    // 11.d stages
    for (const haircut of haircuts) {
      const haircutId = haircut.id;
      const stagesPerHaircut = await ServicePeriod.findAll({
        attributes: ['id'],
        include: [
          { model: Service, required: true, attributes: [], where: { id: haircutId } },
        ],
      });
      haircut['haircutStageIds'] = stagesPerHaircut.map((s: any) => s.id);
    }

    // 11.d completion rules
    for (const haircut of haircuts) {
      const haircutId = haircut.id;
      const rulesPerHaircut = await ServiceBookingCompletionRequirement.findAll({
        include: [
          { model: Service, required: true, attributes: [], where: { id: haircutId } },
        ],
      });
      haircut['haircutBookingCompletionRuleIds'] = rulesPerHaircut.map(
        (r: any) => r.companyBookingCompletionRequirementId,
      );
    }

    ctx.response['haircuts'] = haircuts;
  }
}

export default LoadHaircutsHandler;
