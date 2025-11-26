import { routerOptions } from '@app/config';
import { Router } from 'express';
import { locationRouterPatchLocation } from './locationRouterPatchLocation';
import { locationRouterPostLocation } from './locationRouterPostLocation';

export const locationRouter = Router(routerOptions)
  .use('/', locationRouterPostLocation)
  .use('/:locationId', locationRouterPatchLocation);
