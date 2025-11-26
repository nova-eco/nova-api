import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads seats for the company and augments each seat with `haircutIds`.
 * Expects `seatModel` to implement `findByCompanyId` and a helper
 * `findProductIdsBySeatId` (or similar) to retrieve services for a seat.
 */
export class LoadSeatsAndHaircutIdsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const { companyId } = ctx;
    const seatModel = ctx.seatModel;
    const chairModel = ctx.seatModel; // alias

    // seats
    const seats = await seatModel.findByCompanyId(companyId as string);
    // compute haircutIds per seat using chair/seat relationship
    const chairsJSON = seats.map((s: any) => ({ ...s }));

    for (const chairJSON of chairsJSON) {
      const products = await chairModel
        .findProductIdsBySeatId(chairJSON.id as string)
        .catch(() => []);
      const haircutIds = products.map((p: any) => p.id);
      chairJSON['haircutIds'] = haircutIds;
    }

    ctx.response['seats'] = chairsJSON;
  }
}

export default LoadSeatsAndHaircutIdsHandler;
