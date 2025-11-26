import { LoadServiceLeadAndStaffHandler } from '../../../../src/engines/BookingEngine/handlers/LoadServiceLeadAndStaffHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('LoadServiceLeadAndStaffHandler', () => {
  test('throws when serviceLead not found', async () => {
    const handler = new LoadServiceLeadAndStaffHandler();
    const ctx = {
      service: { id: 's1' },
      serviceLeadModel: { findOne: jest.fn().mockResolvedValue(null) },
      staffModel: { findByPk: jest.fn() },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: serviceLead: not found',
    );
  });

  test('throws when staff not found', async () => {
    const handler = new LoadServiceLeadAndStaffHandler();
    const fakeLead = { staffId: 'st1' };
    const ctx = {
      service: { id: 's1' },
      serviceLeadModel: { findOne: jest.fn().mockResolvedValue(fakeLead) },
      staffModel: { findByPk: jest.fn().mockResolvedValue(null) },
    } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: staff: not found',
    );
  });

  test('loads serviceLead and staff', async () => {
    const handler = new LoadServiceLeadAndStaffHandler();
    const fakeLead = { staffId: 'st1' };
    const fakeStaff = { id: 'st1' };
    const ctx = {
      service: { id: 's1' },
      serviceLeadModel: { findOne: jest.fn().mockResolvedValue(fakeLead) },
      staffModel: { findByPk: jest.fn().mockResolvedValue(fakeStaff) },
    } as unknown as BookingContext;
    await handler.handle(ctx);
    expect((ctx as any).serviceLead).toBe(fakeLead);
    expect((ctx as any).staff).toBe(fakeStaff);
  });
});
