import { routerOptions } from '@app/config';
import SetupEngine from '@app/engines/SetupEngine';
import {
  GeoCityModel,
  GeoCountryModel,
  LocationModel,
  OpenHourTypeModel,
  SalonModel,
  SalonOpenHourModel,
  SeatModel,
  StaffModel,
} from '@app/models';
import { Router } from 'express';

export const setupRouterGetSetup = Router(routerOptions).get(
  '/',
  async (req, res, next) => {
    try {
      const { params } = req;

      const staffModel = new StaffModel();
      const salonModel = new SalonModel();
      const seatModel = new SeatModel();
      const salonOpenHourModel = new SalonOpenHourModel();
      const openHourTypeModel = new OpenHourTypeModel();
      const locationModel = new LocationModel();
      const geoCityModel = new GeoCityModel();
      const geoCountryModel = new GeoCountryModel();

      const engine = SetupEngine.defaultChain({});

      const ctx = {
        params,
        staffModel,
        salonModel,
        seatModel,
        salonOpenHourModel,
        openHourTypeModel,
        locationModel,
        geoCityModel,
        geoCountryModel,
      } as any;

      const resultCtx = await engine.run(ctx);

      res.status(200).json(resultCtx.response || {});
    } catch (error) {
      next(error);
    }
  },
);
