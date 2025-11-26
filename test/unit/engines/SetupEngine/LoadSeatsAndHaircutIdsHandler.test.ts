import { LoadSeatsAndHaircutIdsHandler } from '../../../../src/engines/SetupEngine/handlers/LoadSeatsAndHaircutIdsHandler';
import { SetupContext } from '../../../../src/engines/SetupEngine/context';

describe('LoadSeatsAndHaircutIdsHandler', () => {
  test('loads seats and enriches with haircutIds', async () => {
    const fakeSeats = [{ id: 'seat1' }, { id: 'seat2' }];
    const fakeProductsSeat1 = [{ id: 's1' }];
    const fakeProductsSeat2 = [{ id: 's2' }];

    const seatModel = {
      findByCompanyId: jest.fn().mockResolvedValue(fakeSeats),
      findProductIdsBySeatId: jest
        .fn()
        .mockImplementation((seatId: string) =>
          seatId === 'seat1'
            ? Promise.resolve(fakeProductsSeat1)
            : Promise.resolve(fakeProductsSeat2),
        ),
    };

    const handler = new LoadSeatsAndHaircutIdsHandler();
    const ctx = { companyId: 'c1', seatModel, response: {} } as unknown as SetupContext;

    await handler.handle(ctx);

    expect(ctx.response!['seats']).toBeDefined();
    expect(ctx.response!['seats'][0].haircutIds).toEqual(['s1']);
  });
});
