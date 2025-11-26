import { routerOptions } from '@app/config';
import { CompanyModel, LocationModel, SalonModel } from '@app/models';
import { Router } from 'express';

export const salonRouterPatchSalon = Router(routerOptions).patch(
  '/',
  async (req, res, next) => {
    try {
      const companyModel = new CompanyModel();
      const locationModel = new LocationModel();
      const salonModel = new SalonModel();
      const { body, params } = req;

      let shouldUpdateSalon = false;

      const salonId = typeof params['salonId'] !== 'undefined' ? params['salonId'] : null;

      if (salonId === null) {
        throw new Error('salonRouterPatchSalon: salonId: not found');
      }

      const salon = await salonModel.findByPk(salonId);

      if (salon === null) {
        throw new Error('salonRouterPatchSalon: salon: not found');
      }

      const salonCompanyId =
        typeof salon['companyId'] !== 'undefined' ? salon['companyId'] : null;

      if (salonCompanyId === null) {
        throw new Error('salonRouterPatchSalon:  salonCompanyId: not found');
      }

      const salonCompany = await companyModel.findByPk(salonCompanyId);

      if (salonCompany === null) {
        throw new Error('salonRouterPatchSalon: salonCompany: not found');
      }

      const response = {
        ...salon,
      };

      /*
       * locationId
       */
      const locationId =
        typeof body['locationId'] !== 'undefined' ? body['locationId'] : null;

      const salonFieldsToUpdate = {};

      if (locationId !== null) {
        const location = await locationModel.findByPk(locationId);

        if (location === null) {
          throw new Error('salonRouterPatchSalon:  locationId: not found');
        }

        salonFieldsToUpdate['locationId'] = locationId;
        response['locationId'] = locationId;
        shouldUpdateSalon = true;
      }

      /*
       * description
       */
      const description =
        typeof body['description'] !== 'undefined' ? body['description'] : null;

      if (description !== null) {
        salonFieldsToUpdate['description'] = description;
        response['description'] = description;
        shouldUpdateSalon = true;
      }

      /*
       * name
       */
      const name = typeof body['name'] !== 'undefined' ? body['name'] : null;

      if (name !== null) {
        salonFieldsToUpdate['name'] = name;
        shouldUpdateSalon = true;
        response['name'] = name;
      }

      /*
       * temporalDurationId
       */
      const timeSlotTemporalDurationId =
        typeof body['temporalDurationId'] !== 'undefined'
          ? body['temporalDurationId']
          : null;

      if (timeSlotTemporalDurationId !== null) {
        salonFieldsToUpdate['timeSlotTemporalDurationId'] = timeSlotTemporalDurationId;
        response['temporalDurationId'] = timeSlotTemporalDurationId;
        shouldUpdateSalon = true;
      }

      if (shouldUpdateSalon === true) {
        await salonModel.update(salonId, salonFieldsToUpdate);
      }

      response['seatIds'] = await salonModel.getSeatIds(salonId);
      response['staffIds'] = await salonModel.getStaffIds(salonId);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);
