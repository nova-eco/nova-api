import { routerOptions } from '@app/config';
import { Router } from 'express';
import { staffRouterPatchStaff } from './staffRouterPatchStaff';

export const staffRouter = Router(routerOptions).use('/:staffId', staffRouterPatchStaff);
