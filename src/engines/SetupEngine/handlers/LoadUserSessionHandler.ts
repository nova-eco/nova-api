import { AccountModel, SessionModel, UserModel } from '@app/models';
import { Op } from 'sequelize';
import { SetupContext } from '../context';
import { IHandler } from '../handler';

/**
 * Loads user, session and account information and initializes the response
 * object on the context.
 */
export class LoadUserSessionHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const { userId } = ctx;

    const user = await User.findByPk(userId);
    if (user === null) {
      throw new Error('setupRouterGetSetup: user: not found');
    }

    const currentTimestamp = Date.now();
    const session = await Session.findOne({
      where: {
        userId,
        validUntilTimestamp: {
          [Op.gt]: currentTimestamp,
        },
      },
    });

    if (session === null) {
      throw new Error('setupRouterGetSetup: session: not found');
    }

    ctx.user = user;
    ctx.session = session;

    const account = await Account.findOne({ where: { userId } });
    if (account === null) {
      throw new Error('setupRouterGetSetup: account: not found');
    }

    ctx.account = account;
    const companyId =
      typeof account['companyId'] !== 'undefined' ? account['companyId'] : null;
    if (companyId === null) {
      throw new Error('setupRouterGetSetup: companyId: not found');
    }
    ctx.companyId = companyId;

    const company = await models.Company.findOne({
      attributes: ['id', 'description', 'name'],
      where: { id: companyId },
    });
    if (company === null) {
      throw new Error('setupRouterGetSetup: company: not found');
    }
    ctx.company = company;

    // init response container
    ctx.response = ctx.response || {};
    ctx.response['session'] = {
      id: session.id,
      userId,
      validUntilTimestamp: session.validUntilTimestamp,
    };
    ctx.response['company'] = company.toJSON();
  }
}

export default LoadUserSessionHandler;
