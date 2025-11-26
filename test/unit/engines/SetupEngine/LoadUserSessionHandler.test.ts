import { LoadUserSessionHandler } from '../../../../src/engines/SetupEngine/handlers/LoadUserSessionHandler';
import { SetupContext } from '../../../../src/engines/SetupEngine/context';

// Mock Db.getDb to return fake models
jest.mock('@app/core/api/Db', () => ({
  Db: {
    getDb: () => ({
      models: {
        Session: { findOne: jest.fn() },
        Account: { findOne: jest.fn() },
        User: { findByPk: jest.fn() },
        Company: { findOne: jest.fn() },
      },
    }),
  },
}));

describe('LoadUserSessionHandler', () => {
  afterEach(() => jest.resetAllMocks());

  test('throws when user not found', async () => {
    const db = require('@app/core/api/Db').Db.getDb();
    db.models.User.findByPk.mockResolvedValue(null);

    const handler = new LoadUserSessionHandler();
    const ctx = { userId: 'u1' } as unknown as SetupContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'setupRouterGetSetup: user: not found',
    );
  });

  test('throws when session not found', async () => {
    const db = require('@app/core/api/Db').Db.getDb();
    db.models.User.findByPk.mockResolvedValue({ id: 'u1' });
    db.models.Session.findOne.mockResolvedValue(null);

    const handler = new LoadUserSessionHandler();
    const ctx = { userId: 'u1' } as unknown as SetupContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'setupRouterGetSetup: session: not found',
    );
  });

  test('loads user, session, account and company and sets response', async () => {
    const db = require('@app/core/api/Db').Db.getDb();
    const fakeUser = { id: 'u1' };
    const fakeSession = { id: 's1', validUntilTimestamp: Date.now() + 10000 };
    const fakeAccount = { id: 'a1', companyId: 'c1' };
    const fakeCompany = { id: 'c1', toJSON: () => ({ id: 'c1', name: 'C' }) };

    db.models.User.findByPk.mockResolvedValue(fakeUser);
    db.models.Session.findOne.mockResolvedValue(fakeSession);
    db.models.Account.findOne.mockResolvedValue(fakeAccount);
    db.models.Company.findOne.mockResolvedValue(fakeCompany);

    const handler = new LoadUserSessionHandler();
    const ctx = { userId: 'u1' } as unknown as SetupContext;
    await handler.handle(ctx);

    expect((ctx as any).user).toBe(fakeUser);
    expect((ctx as any).session).toBe(fakeSession);
    expect((ctx as any).account).toBe(fakeAccount);
    expect((ctx as any).company).toBe(fakeCompany);
    expect(ctx.response).toBeDefined();
    expect(ctx.response!.session.id).toBe(fakeSession.id);
  });
});
