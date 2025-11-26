import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads seats for the company and augments each seat with `haircutIds`.
 * Expects `seatModel` to implement `findByCompanyId` and a helper
 * `findProductIdsBySeatId` (or similar) to retrieve services for a seat.
 */
export class LoadChairsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const { companyId } = ctx;
    const chairModel = ctx.chairModel;

    const chairs = await chairModel.findByCompanyId(companyId as string);
    const chairsJSON = chairs.map((c: any) => ({ ...c }));

    for (const chairJSON of chairsJSON) {
      const products = await chairModel
        .findProductIdsBySeatId(chairJSON.id as string)
        .catch(() => []);
      const serviceIds = products.map((p: any) => p.id);
      chairJSON['serviceIds'] = serviceIds;
    }

    ctx.response['seats'] = chairsJSON;
  }
}

export default LoadSeatsAndServicesIdsHandler;
