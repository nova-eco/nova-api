import { PreBookingContext } from '../context';
import { IHandler } from '../handler';

export class CalcValidUntilHandler implements IHandler<PreBookingContext> {
  async handle(ctx: PreBookingContext): Promise<void> {
    const currentTimestampMilliseconds = Date.now();
    const currentTimestampSeconds = Math.round(currentTimestampMilliseconds / 1000);
    const durationMins = ctx.companyPreBookingDuration![0]['durationMins'];
    const durationSeconds = durationMins * 60;
    const validUntilTimestampSeconds = currentTimestampSeconds + durationSeconds;
    ctx.validUntilTimestampSeconds = validUntilTimestampSeconds;
  }
}
