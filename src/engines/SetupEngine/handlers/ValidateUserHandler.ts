import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Ensures `userId` route param exists and places it on the context.
 */
export class ValidateUserHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const { params } = ctx;
    const userId = typeof params['userId'] !== 'undefined' ? params['userId'] : null;
    if (userId === null || userId === '') {
      throw new Error('setupRouterGetSetup: userId: not found');
    }
    ctx.userId = userId;
  }
}

export default ValidateUserHandler;
