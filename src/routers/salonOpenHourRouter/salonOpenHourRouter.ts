import { routerOptions } from '@app/config';
import { Router } from 'express';
import { salonOpenHourRouterPatchOpenHourSalon } from './salonOpenHourRouterPatchSalonOpenHour';
import { salonOpenHourRouterPostOpenHourSalon } from './salonOpenHourRouterPostSalonOpenHour';

export const salonOpenHourRouter = Router(routerOptions)
  .use('/', salonOpenHourRouterPostOpenHourSalon)
  .use('/:salonOpenHourId', salonOpenHourRouterPatchOpenHourSalon);
