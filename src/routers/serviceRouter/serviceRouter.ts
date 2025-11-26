import { routerOptions } from '@app/config';
import { Router } from 'express';
import { serviceRouterPostHaircut } from './serviceRouterPostService';

export const serviceRouter = Router(routerOptions).use('/', serviceRouterPostHaircut);
