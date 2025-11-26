import { routerOptions } from '@app/config';
import { GeoCityModel, LocationModel } from '@app/models';
import { Router } from 'express';

export const locationRouterPatchLocation = Router(routerOptions).patch(
  '/',
  async (req, res, next) => {
    try {
      const geoCityModel = new GeoCityModel();
      const locationModel = new LocationModel();
      const { body, params } = req;

      const locationId =
        typeof params['locationId'] !== 'undefined' ? params['locationId'] : null;

      if (locationId === null || locationId === '') {
        throw new Error('salonLocationRouterPatchLocation: locationId: not found');
      }

      const location = await locationModel.findByPk(locationId);

      if (location === null) {
        throw new Error('salonLocationRouterPatchLocation: location: not found');
      }

      const addressLineOne =
        typeof body['addressLineOne'] !== 'undefined' ? body['addressLineOne'] : null;

      const addressLineTwo =
        typeof body['addressLineTwo'] !== 'undefined' ? body['addressLineTwo'] : null;

      const geoCityId =
        typeof body['geoCityId'] !== 'undefined' ? body['geoCityId'] : null;

      const postcode = typeof body['postcode'] !== 'undefined' ? body['postcode'] : null;

      let shouldLocationBeUpdated = false;
      const fieldValuesToUpdate = {};

      const response = {
        id: locationId,
        addressLineOne: location.addressLineOne,
        addressLinetwo: location.addressLineTwo,
        geoCityId: location.geoCityId,
        geoCountryId: location.geoCountryId,
        postcode: location.postcode,
      };

      if (addressLineOne !== null && addressLineOne !== location.addressLineOne) {
        fieldValuesToUpdate['addressLineOne'] = addressLineOne;
        response['addressLineOne'] = addressLineOne;
        shouldLocationBeUpdated = true;
      }

      if (addressLineTwo !== null && addressLineTwo !== location.addressLineTwo) {
        fieldValuesToUpdate['addressLineTwo'] = addressLineTwo;
        response['addressLineTwo'] = addressLineTwo;
        shouldLocationBeUpdated = true;
      }

      if (geoCityId !== null && geoCityId !== location.geoCityId) {
        const geoCity = await geoCityModel.findByPk(geoCityId);

        if (geoCity === null) {
          throw new Error('salonLocationRouterPatchLocation: geoCity: not found');
        }

        fieldValuesToUpdate['geoCityId'] = geoCityId;
        response['geoCityId'] = geoCityId;
        shouldLocationBeUpdated = true;
      }

      if (postcode !== null && postcode !== location.postcode) {
        fieldValuesToUpdate['postcode'] = postcode;
        response['postcode'] = postcode;
        shouldLocationBeUpdated = true;
      }

      if (shouldLocationBeUpdated === true) {
        const potentialDuplicate = await locationModel.findOne(fieldValuesToUpdate);

        if (potentialDuplicate === null) {
          await locationModel.update(locationId, fieldValuesToUpdate);
        } else {
          response.id = potentialDuplicate.id;
        }
      }

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  },
);
