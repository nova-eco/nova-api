import { LoadServiceHandler } from '../../../../../src/engines/PreBookingEngine/handlers/LoadServiceHandler';
import { PreBookingContext } from '../../../../../src/engines/PreBookingEngine/context';

describe('LoadServiceHandler', () => {
  test('loads service and companyId into context', async () => {
    const handler = new LoadServiceHandler();

    const fakeService = { id: 's1', companyId: 'c1' };
    const serviceModel = {
      findByPk: jest.fn().mockResolvedValue(fakeService),
    };

    const ctx: Partial<PreBookingContext> = {
      serviceId: 's1',
      serviceModel: serviceModel as any,
    };

    await handler.handle(ctx as PreBookingContext);

    expect((ctx as any).service).toBe(fakeService);
    expect(ctx.companyId).toBe('c1');
  });

  test('throws when service not found', async () => {
    const handler = new LoadServiceHandler();

    const serviceModel = {
      findByPk: jest.fn().mockResolvedValue(null),
    };

    const ctx: Partial<PreBookingContext> = {
      serviceId: 's1',
      serviceModel: serviceModel as any,
    };

    await expect(handler.handle(ctx as PreBookingContext)).rejects.toThrow(
      'bookingRouterPostBookingPre: service: not found',
    );
  });
});
