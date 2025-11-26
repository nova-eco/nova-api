import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadServicePeriodRoleTypesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const ServicePeriodRoleType = models.ServicePeriodRoleType;
    const OrganisationProductPeriodRoleType = models.OrganisationProductPeriodRoleType;

    const roleTypes = await ServicePeriodRoleType.findAll({
      attributes: [
        'id',
        [db.col('OrganisationProductPeriodRoleType.description'), 'description'],
        [db.col('OrganisationProductPeriodRoleType.name'), 'name'],
      ],
      include: [
        { model: OrganisationProductPeriodRoleType, required: true, attributes: [] },
      ],
    });

    ctx.response['haircutStageRoleTypes'] = roleTypes.map((r: any) => r.toJSON());
  }
}

export default LoadServicePeriodRoleTypesHandler;
