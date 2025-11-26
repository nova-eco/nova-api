import { routerOptions } from '@app/config';
import { PreBookingEngine } from '@app/engines/PreBookingEngine';
import { PreBookingContext } from '@app/engines/PreBookingEngine/context';
import {
  BookingPreModel,
  ChairServiceModel,
  CompanyModel,
  SalonModel,
  SeatModel,
  ServiceModel,
  StaffModel,
  UserModel,
} from '@app/models';
import { Router } from 'express';

export const bookingRouterPostBookingPre = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const { body } = req;

      const bookingPreModel = new BookingPreModel();
      const companyModel = new CompanyModel();
      const salonModel = new SalonModel();
      const serviceModel = new ServiceModel();

      // If other model instances are needed by handlers, attach them here
      const ctx: PreBookingContext = {
        body,
        bookingPreModel,
        companyModel,
        salonModel,
        serviceModel,
      } as any;
      // Inject additional model instances explicitly
      (ctx as any).staffModel = new StaffModel();
      (ctx as any).userModel = new UserModel();
      (ctx as any).seatModel = new SeatModel();
      (ctx as any).chairServiceModel = new ChairServiceModel();

      const engine = PreBookingEngine.defaultChain();
      const resultCtx = await engine.process(ctx);

      res.status(201).json(resultCtx.result);
    } catch (error) {
      next(error);
    }
  },
);
