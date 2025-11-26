import { routerOptions } from '@app/config';
import { Router } from 'express';
import { loginRouterPostLogin } from './loginRouterPostLogin';

export const loginRouter = Router(routerOptions).use('/', loginRouterPostLogin);
