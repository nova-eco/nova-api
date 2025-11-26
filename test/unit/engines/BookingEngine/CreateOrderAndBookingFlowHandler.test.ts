import { CreateOrderAndBookingFlowHandler } from '../../../../src/engines/BookingEngine/handlers/CreateOrderAndBookingFlowHandler';
import { BookingContext } from '../../../../src/engines/BookingEngine/context';

describe('CreateOrderAndBookingFlowHandler', () => {
  test('throws when userId missing', async () => {
    const handler = new CreateOrderAndBookingFlowHandler();
    const ctx = { user: null } as unknown as BookingContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'bookingRouterPostBooking: userId: not found',
    );
  });

  test('creates order, orderServicePrice, orderBalance, booking', async () => {
    const fakeOrder = { id: 'o1' };
    const fakeOrderServicePrice = { id: 'osp1' };
    const fakeOrderBalance = { id: 'ob1' };
    const fakeBooking = { id: 'b1' };

    const handler = new CreateOrderAndBookingFlowHandler();
    const ctx = {
      user: { id: 'u1' },
      orderModel: { create: jest.fn().mockResolvedValue(fakeOrder) },
      orderServicePriceModel: {
        create: jest.fn().mockResolvedValue(fakeOrderServicePrice),
      },
      orderBalanceModel: { create: jest.fn().mockResolvedValue(fakeOrderBalance) },
      bookingModel: { create: jest.fn().mockResolvedValue(fakeBooking) },
      bookingPre: { id: 'bp1' },
      servicePrice: { id: 'sp1', price: 100 },
    } as unknown as BookingContext;

    await handler.handle(ctx);

    expect((ctx as any).order).toBe(fakeOrder);
    expect((ctx as any).orderServicePrice).toBe(fakeOrderServicePrice);
    expect((ctx as any).orderBalance).toBe(fakeOrderBalance);
    expect((ctx as any).booking).toBe(fakeBooking);
    expect((ctx as any).bookingId).toBe('b1');
  });
});
