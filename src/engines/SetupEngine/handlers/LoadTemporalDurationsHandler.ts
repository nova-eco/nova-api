import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadTemporalDurationsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const TemporalDuration = models.TemporalDuration;

    const temporalDurations = await TemporalDuration.findAll({
      attributes: ['id', 'durationIso'],
    });
    ctx.response['temporalDurations'] = temporalDurations;
  }
}

export default LoadTemporalDurationsHandler;
