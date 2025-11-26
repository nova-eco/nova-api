import { routerOptions } from '@app/config';
import {
  LoginErrorModel,
  LoginIpModel,
  LoginModel,
  LoginSessionModel,
  LoginUsernameModel,
  PasswordModel,
  SessionModel,
  UserModel,
} from '@app/models';
import { Router } from 'express';

export const loginRouterPostLogin = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const userModel = new UserModel();
      const sessionModel = new SessionModel();
      const passwordModel = new PasswordModel();
      const loginModel = new LoginModel();
      const loginErrorModel = new LoginErrorModel();
      const loginIpModel = new LoginIpModel();
      const loginSessionModel = new LoginSessionModel();
      const loginUsernameModel = new LoginUsernameModel();
      const { body, ip } = req;

      /*
       * 1. Username
       */
      const username = typeof body['username'] !== 'undefined' ? body['username'] : null;

      if (username === null) {
        throw new Error('loginRouterPostLogin: username not found');
      }

      /*
       * 2. Password
       */
      const foundPasswordStr =
        typeof body['password'] !== 'undefined' ? body['password'] : null;

      if (foundPasswordStr === null) {
        throw new Error('loginRouterPostLogin: foundPasswordStr not found');
      }

      /*
       * 3. Find login username
       */
      let loginUsername = await loginUsernameModel.findOne({ username });

      if (loginUsername === null) {
        loginUsername = await loginUsernameModel.create({ username });
      }

      /*
       * 4. LoginUsernameId
       */
      const loginUsernameId =
        typeof loginUsername['id'] !== 'undefined' ? loginUsername['id'] : null;

      if (loginUsernameId === null) {
        throw new Error('loginUsernameId: not found');
      }

      /*
       * 5. Find login ip
       */
      let loginIp = await loginIpModel.findOne({ ip });

      if (loginIp === null) {
        loginIp = await loginIpModel.create({ ip });
      }

      /*
       * 6. LoginIpId
       */
      const loginIpId = typeof loginIp['id'] !== 'undefined' ? loginIp['id'] : null;

      if (loginIpId === null) {
        throw new Error('loginIpId: not found');
      }

      /*
       * 7. Login entry
       */
      const loginTimestamp = Date.now();
      const login = await loginModel.create({
        loginIpId,
        loginUsernameId,
        loginTimestamp,
      });

      if (login === null) {
        throw new Error('loginRouterPostLogin: login not created');
      }

      /*
       * 8. LoginId
       */
      const loginId = typeof login['id'] !== 'undefined' ? login['id'] : null;

      if (loginId === null) {
        throw new Error('loginRouterPostLogin: loginId not found');
      }

      try {
        /*
         * 9. User
         */
        const user = await userModel.findOne({
          username,
        });

        if (user === null) {
          throw new Error('loginRouterPostLogin: user not found');
        }

        /*
         * 10. UserId
         */
        const userId = typeof user['id'] !== 'undefined' ? user['id'] : null;

        if (userId === null) {
          throw new Error('loginRouterPostLogin: userId not found');
        }

        /*
         * 11. Known password
         */
        const knownPassword = await passwordModel.getLatestPassword(userId);

        if (knownPassword === null) {
          throw new Error('loginRouterPostLogin: knownPassword not found');
        }

        /*
         * 12. Compare passwords
         */
        if (knownPassword['password'] !== foundPasswordStr) {
          throw new Error('loginRouterPostLogin: password: invalid');
        }

        /*
         * 13. Check for active sessions
         */
        const activeSession = await sessionModel.findActiveSession(
          userId,
          loginTimestamp,
        );

        if (activeSession !== null) {
          await sessionModel.invalidateSession(activeSession.id, loginTimestamp);
        }

        /*
         * 14. Create session
         */
        const validUntilTimestamp = Date.now() + 1000 * 60 * 30;
        const session = await sessionModel.create({
          userId,
          validUntilTimestamp,
        });

        if (session === null) {
          throw new Error('loginRouterPostLogin: session not created');
        }

        /*
         * 15. SessionId
         */
        const sessionId = typeof session['id'] !== 'undefined' ? session['id'] : null;

        if (sessionId === null) {
          throw new Error('loginRouterPostLogin: sessionId not found');
        }

        /*
         * 16. Create the login session entry
         */
        const loginSession = await loginSessionModel.create({
          loginId,
          sessionId,
        });

        if (loginSession === null) {
          throw new Error('loginRouterPostLogin: loginSession: not created');
        }

        res.status(201).json(user);
      } catch (error) {
        const { message } = error;
        const loginError = await loginErrorModel.create({
          loginId,
          errorMessage: message,
        });

        if (loginError === null) {
          throw new Error('loginRouterPostLogin: loginError: not created');
        }

        throw new Error(message);
      }
    } catch (error) {
      next(error);
    }
  },
);
