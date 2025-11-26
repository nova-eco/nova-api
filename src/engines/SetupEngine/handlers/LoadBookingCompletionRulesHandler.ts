import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads booking completion rules for the company and places them on `ctx.response`.
 */
export class LoadBookingCompletionRulesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const CompanyBookingCompletionRequirement =
      models.CompanyBookingCompletionRequirement;
    const OrganisationBookingCompletionRequirement =
      models.OrganisationBookingCompletionRequirement;

    const completionRules = await CompanyBookingCompletionRequirement.findAll({
      attributes: [
        'id',
        [db.col('OrganisationBookingCompletionRequirement.description'), 'description'],
        [db.col('OrganisationBookingCompletionRequirement.name'), 'name'],
      ],
      include: [
        {
          model: OrganisationBookingCompletionRequirement,
          required: true,
          attributes: [],
        },
      ],
    });

    ctx.response['haircutBookingCompletionRules'] = completionRules.map((r: any) =>
      r.toJSON(),
    );
  }
}

export default LoadBookingCompletionRulesHandler;
