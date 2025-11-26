import { routerOptions } from '@app/config';
import { Router } from 'express';
import { setupRouterGetSetup } from './setupRouterGetSetup';

export const setupRouter = Router(routerOptions).use('/:userId', setupRouterGetSetup);
