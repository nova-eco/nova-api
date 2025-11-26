import { CheckCompanyExistsHandler } from '../../../../src/engines/BookingAvailabilityEngine/handlers/CheckCompanyExistsHandler';
import { BookingAvailabilityContext } from '../../../../src/engines/BookingAvailabilityEngine/context';

describe('CheckCompanyExistsHandler', () => {
  test('throws when company not found', async () => {
    const handler = new CheckCompanyExistsHandler();
    const ctx = {
      companyId: 'c1',
      companyModel: { checkCompanyExists: jest.fn().mockResolvedValue([]) },
    } as unknown as BookingAvailabilityContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterGetBookingPre: company: not found',
    );
  });

  test('attaches company when found', async () => {
    const fakeCompany = [{ id: 'c1' }];
    const handler = new CheckCompanyExistsHandler();
    const ctx = {
      companyId: 'c1',
      companyModel: { checkCompanyExists: jest.fn().mockResolvedValue(fakeCompany) },
    } as unknown as BookingAvailabilityContext;
    await handler.handle(ctx);
    expect((ctx as any).company).toBe(fakeCompany);
  });
});
