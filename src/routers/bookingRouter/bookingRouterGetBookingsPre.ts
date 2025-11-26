import { routerOptions } from '@app/config';
import BookingAvailabilityEngine from '@app/engines/BookingAvailabilityEngine';
import { BookingPreModel, CompanyModel } from '@app/models';
import { Router } from 'express';

export const bookingRouterGetBookingsPre = Router(routerOptions).get(
  '/',
  async (req, res, next) => {
    try {
      const bookingPreModel = new BookingPreModel();
      const companyModel = new CompanyModel();
      const { params } = req;

      const engine = BookingAvailabilityEngine.defaultChain();

      const ctx = {
        params,
        bookingPreModel,
        companyModel,
      };

      const resultCtx = await engine.run(ctx as any);

      res.status(200).json(resultCtx.result);
    } catch (error) {
      next(error);
    }
  },
);
