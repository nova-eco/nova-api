import { routerOptions } from '@app/config';
import { Router } from 'express';
import { bookingRouterGetBookingsPre } from './bookingRouterGetBookingsPre';
import { bookingRouterPostBookingPre } from './bookingRouterPostBookingPre';

export const bookingRouter = Router(routerOptions)
  .use('/pre', bookingRouterPostBookingPre)
  .use('/pre/:companyId', bookingRouterGetBookingsPre);
