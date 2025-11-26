import { ValidateUserHandler } from '../../../../src/engines/SetupEngine/handlers/ValidateUserHandler';
import { SetupContext } from '../../../../src/engines/SetupEngine/context';

describe('ValidateUserHandler', () => {
  test('throws when userId missing', async () => {
    const handler = new ValidateUserHandler();
    const ctx = { params: {} } as unknown as SetupContext;
    await expect(handler.handle(ctx)).rejects.toThrow(
      'setupRouterGetSetup: userId: not found',
    );
  });

  test('sets userId on context', async () => {
    const handler = new ValidateUserHandler();
    const ctx = { params: { userId: 'u1' } } as unknown as SetupContext;
    await handler.handle(ctx);
    expect(ctx.userId).toBe('u1');
  });
});
