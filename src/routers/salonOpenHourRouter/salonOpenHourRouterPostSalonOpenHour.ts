import { routerOptions } from '@app/config';
import {
  OpenHourModel,
  OpenHourTypeModel,
  SalonModel,
  SalonOpenHourModel,
} from '@app/models';
import { Router } from 'express';

export const salonOpenHourRouterPostOpenHourSalon = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const openHourModel = new OpenHourModel();
      const openHourTypeModel = new OpenHourTypeModel();
      const salonModel = new SalonModel();
      const salonOpenHourModel = new SalonOpenHourModel();
      const { body } = req;

      const openHourTypeId =
        typeof body['openHourTypeId'] !== 'undefined' ? body['openHourTypeId'] : null;

      if (openHourTypeId === null) {
        throw new Error(
          'salonOpenHourRouterPostOpenHourSalon: openHourTypeId: not found',
        );
      }

      const openHourType = await openHourTypeModel.findByPk(openHourTypeId);

      if (openHourType === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: openHourType: not found');
      }
      const salonId = typeof body['salonId'] !== 'undefined' ? body['salonId'] : null;

      if (salonId === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: salonId: not found');
      }

      const salon = await salonModel.findByPk(salonId);

      if (salon === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: salon: not found');
      }

      const dayIndexValue =
        typeof body['dayIndexValue'] !== 'undefined' ? body['dayIndexValue'] : null;

      if (dayIndexValue === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: dayIndexValue: not found');
      }

      const twentyFourHourValue =
        typeof body['twentyFourHourValue'] !== 'undefined'
          ? body['twentyFourHourValue']
          : null;

      if (twentyFourHourValue === null) {
        throw new Error(
          'salonOpenHourRouterPostOpenHourSalon: twentyFourHourValue: not found',
        );
      }

      const minuteValue =
        typeof body['minuteValue'] !== 'undefined' ? body['minuteValue'] : null;

      if (minuteValue === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: minuteValue: not found');
      }

      let openHour = await openHourModel.findOne({
        openHourTypeId,
        twentyFourHourValue: parseInt(twentyFourHourValue, 10),
        minuteValue: parseInt(minuteValue, 10),
      });

      if (openHour === null) {
        openHour = await openHourModel.create({
          openHourTypeId,
          twentyFourHourValue: parseInt(twentyFourHourValue, 10),
          minuteValue: parseInt(minuteValue, 10),
        });
      }

      if (openHour === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: openHour: not created');
      }

      const openHourId = typeof openHour['id'] !== 'undefined' ? openHour['id'] : null;

      if (openHourId === null) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: openHourId: not found');
      }

      const potentialSalonOpenHourDuplicate = await salonOpenHourModel.count({
        dayIndexValue: parseInt(dayIndexValue, 10),
        openHourId,
        salonId,
      });

      if (potentialSalonOpenHourDuplicate > 0) {
        throw new Error('salonOpenHourRouterPostOpenHourSalon: salonOpenHour: duplicate');
      }

      const salonOpenHour = await salonOpenHourModel.create({
        dayIndexValue: parseInt(dayIndexValue, 10),
        openHourId,
        salonId,
      });

      if (salonOpenHour === null) {
        throw new Error(
          'salonOpenHourRouterPostOpenHourSalon: salonOpenHour: not created',
        );
      }

      const salonOpenHourId =
        typeof salonOpenHour['id'] !== 'undefined' ? salonOpenHour['id'] : null;

      if (salonOpenHourId === null) {
        throw new Error(
          'salonOpenHourRouterPostOpenHourSalon: salonOpenHourId: not found',
        );
      }

      const response = {
        id: salonOpenHourId,
        openHourId,
        openHourTypeId,
        salonId,
        dayIndexValue,
        twentyFourHourValue,
        minuteValue,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
);
