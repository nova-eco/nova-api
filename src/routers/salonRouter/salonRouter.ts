import { routerOptions } from '@app/config';
import { Router } from 'express';
import { salonRouterGetSalonProductStafAvailability } from './salonRouterGetSalonProductStafAvailability';
import { salonRouterGetSalonProductStaff } from './salonRouterGetSalonProductStaff';
import { salonRouterPatchSalon } from './salonRouterPatchSalon';
import { salonRouterPostSalon } from './salonRouterPostSalon';

export const salonRouter = Router(routerOptions)
  .use('/', salonRouterPostSalon)
  .use('/:salonId', salonRouterPatchSalon)
  .use('/:salonId/product/:serviceId', salonRouterGetSalonProductStaff)
  .use(
    '/:salonId/product/:serviceId/staff/:staffId',
    salonRouterGetSalonProductStafAvailability,
  );
