import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadServicePeriodsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const ServicePeriod = models.ServicePeriod;
    const Service = models.Service;
    const TemporalDuration = models.TemporalDuration;

    const servicePeriods = await ServicePeriod.findAll({
      attributes: [
        'id',
        ['servicePeriodRoleTypeId', 'haircutStageRoleTypeId'],
        ['serviceSequenceNumber', 'name'],
        [db.col('TemporalDuration.durationIso'), 'temporalDuration'],
      ],
      include: [
        {
          model: Service,
          required: true,
          attributes: [],
          include: [
            {
              model: models.Company,
              required: true,
              attributes: [],
              where: { id: ctx.companyId },
            },
          ],
        },
        { model: TemporalDuration, required: true, attributes: [] },
      ],
    });

    ctx.response['haircutStages'] = servicePeriods.map((p: any) => p.toJSON());
  }
}

export default LoadServicePeriodsHandler;
