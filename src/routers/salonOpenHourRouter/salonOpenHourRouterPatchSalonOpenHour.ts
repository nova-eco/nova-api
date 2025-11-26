import { routerOptions } from '@app/config';
import {
  OpenHourModel,
  OpenHourTypeModel,
  SalonModel,
  SalonOpenHourModel,
} from '@app/models';
import { Router } from 'express';

export const salonOpenHourRouterPatchOpenHourSalon = Router(routerOptions).patch(
  '/',
  async (req, res, next) => {
    try {
      const openHourModel = new OpenHourModel();
      const openHourTypeModel = new OpenHourTypeModel();
      const salonModel = new SalonModel();
      const salonOpenHourModel = new SalonOpenHourModel();
      const { body, params } = req;

      let shouldUpdateSalonOpenHour = false;
      const salonOpenHourValuesToUpdate = {};

      const salonOpenHourId =
        typeof params['salonOpenHourId'] !== 'undefined'
          ? params['salonOpenHourId']
          : null;

      if (salonOpenHourId === null) {
        throw new Error(
          'salonOpenHourRouterPatchOpenHourSalon: salonOpenHourId: not found',
        );
      }

      const salonOpenHour = await salonOpenHourModel.findByPk(salonOpenHourId);

      if (salonOpenHour === null) {
        throw new Error(
          'salonOpenHourRouterPatchOpenHourSalon: salonOpenHour: not found',
        );
      }

      const openHourId =
        typeof body['openHourId'] !== 'undefined' ? body['openHourId'] : null;

      if (openHourId === null) {
        throw new Error('salonOpenHourRouterPatchOpenHourSalon: openHourId: not found');
      }

      let openHour = await openHourModel.findByPk(openHourId);

      if (openHour === null) {
        throw new Error('salonOpenHourRouterPatchOpenHourSalon: openHour: not created');
      }

      const openHourValuesToUpdate = {};

      const salonId = typeof body['salonId'] !== 'undefined' ? body['salonId'] : null;

      if (salonId === null) {
        throw new Error('salonOpenHourRouterPatchOpenHourSalon: salonId: not found');
      }

      const salon = await salonModel.findByPk(salonId);

      if (salon === null) {
        throw new Error('salonOpenHourRouterPatchOpenHourSalon: salon: not found');
      }

      // OPEN HOUR

      const openHourTypeId =
        typeof body['openHourTypeId'] !== 'undefined' ? body['openHourTypeId'] : null;

      let openHourType;

      if (openHourTypeId !== null) {
        openHourType = await openHourTypeModel.findByPk(openHourTypeId);

        if (openHourType === null) {
          throw new Error(
            'salonOpenHourRouterPatchOpenHourSalon: openHourType: not found',
          );
        }

        if (openHourType.id !== openHour.openHourTypeId) {
          openHourValuesToUpdate['openHourTypeId'] = openHourType.id;
        }
      }

      const twentyFourHourValue =
        typeof body['twentyFourHourValue'] !== 'undefined'
          ? parseInt(body['twentyFourHourValue'], 10)
          : null;

      if (
        twentyFourHourValue !== null &&
        twentyFourHourValue !== openHour.twentyFourHourValue
      ) {
        openHourValuesToUpdate['twentyFourHourValue'] = twentyFourHourValue;
      }

      const minuteValue =
        typeof body['minuteValue'] !== 'undefined'
          ? parseInt(body['minuteValue'], 10)
          : null;

      if (minuteValue !== null && minuteValue !== openHour.minuteValue) {
        openHourValuesToUpdate['minuteValue'] = minuteValue;
      }

      let nextOpenHour;

      console.log({ openHourValuesToUpdate });

      if (Object.values(openHourValuesToUpdate).length > 0) {
        nextOpenHour = await openHourModel.findOne(openHourValuesToUpdate);

        console.log({ openHourValuesToUpdate });

        if (nextOpenHour === null) {
          nextOpenHour = await openHourModel.create({
            openHourTypeId: openHour.openHourTypeId,
            twentyFourHourValue: openHour.twentyFourHourValue,
            minuteValue: openHour.minuteValue,
            ...openHourValuesToUpdate,
          });
        }

        if (nextOpenHour === null) {
          throw new Error(
            'salonOpenHourRouterPatchOpenHourSalon: openHourType: not found',
          );
        }

        salonOpenHourValuesToUpdate['openHourId'] = nextOpenHour.id;
        shouldUpdateSalonOpenHour = true;
        openHour = nextOpenHour;
      }

      const dayIndexValue =
        typeof body['dayIndexValue'] !== 'undefined'
          ? parseInt(body['dayIndexValue'], 10)
          : null;

      console.log({ dayIndexValue });

      if (dayIndexValue !== null && dayIndexValue !== salonOpenHour.dayIndexValue) {
        salonOpenHourValuesToUpdate['dayIndexValue'] = dayIndexValue;
        shouldUpdateSalonOpenHour = true;
      }

      console.log({ shouldUpdateSalonOpenHour });

      if (shouldUpdateSalonOpenHour === true) {
        const potentialSalonOpenHourDuplicate = await salonOpenHourModel.count({
          id: salonOpenHour.id,
          ...salonOpenHourValuesToUpdate,
        });

        console.log({ potentialSalonOpenHourDuplicate });
        if (potentialSalonOpenHourDuplicate > 0) {
          throw new Error(
            'salonOpenHourRouterPatchOpenHourSalon: salonOpenHour: potential duplicate',
          );
        }

        console.log({ salonOpenHourValuesToUpdate });
        await salonOpenHourModel.update(salonOpenHourId, salonOpenHourValuesToUpdate);
      }

      console.log({ salonOpenHour });

      const response = {
        id: salonOpenHourId,
        openHourId: openHour.id,
        openHourTypeId: openHour.openHourTypeId,
        salonId: salonId,
        dayIndexValue:
          salonOpenHourValuesToUpdate.dayIndexValue ?? salonOpenHour.dayIndexValue,
        twentyFourHourValue: openHour.twentyFourHourValue,
        minuteValue: openHour.minuteValue,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);
