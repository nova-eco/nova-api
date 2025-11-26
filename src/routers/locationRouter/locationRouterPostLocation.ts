import { routerOptions } from '@app/config';
import { GeoCityModel, LocationModel } from '@app/models';
import { Router } from 'express';

export const locationRouterPostLocation = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const geoCityModel = new GeoCityModel();
      const locationModel = new LocationModel();
      const { body } = req;

      const addressLineOne =
        typeof body['addressLineOne'] !== 'undefined' ? body['addressLineOne'] : null;

      const addressLineTwo =
        typeof body['addressLineTwo'] !== 'undefined' ? body['addressLineTwo'] : null;

      const geoCityId =
        typeof body['geoCityId'] !== 'undefined' ? body['geoCityId'] : null;
      const geoCountryId =
        typeof body['geoCountryId'] !== 'undefined' ? body['geoCountryId'] : null;
      const postcode = typeof body['postcode'] !== 'undefined' ? body['postcode'] : null;

      if (addressLineOne === null) {
        throw new Error('salonLocationRouterPostLocation: addressLineOne: not found');
      }

      if (addressLineTwo === null) {
        throw new Error('salonLocationRouterPostLocation: addressLineTwo: not found');
      }

      if (geoCityId === null) {
        throw new Error('salonLocationRouterPostLocation: geoCityId: not found');
      }

      const geoCity = await geoCityModel.findByPk(geoCityId);

      if (geoCity === null) {
        throw new Error('salonLocationRouterPostLocation: geoCity: not found');
      }

      if (postcode === null) {
        throw new Error('salonLocationRouterPostLocation: postcode: not found');
      }

      const doesPostcodeExist = await locationModel.count({
        postcode,
      });

      if (doesPostcodeExist > 0) {
        throw new Error('salonLocationRouterPostLocation: postcode: exists');
      }

      const locationParams = {
        addressLineOne,
        addressLineTwo,
        addressLineThree: null,
        geoCityId,
        postcode,
      };

      const location = await locationModel.create(locationParams);

      if (location === null) {
        throw new Error('salonLocationRouterPostLocation: location: not created');
      }

      /*
       * Response
       */
      const response = {
        id: location.id,
        addressLineOne: location.addressLineOne,
        addressLineTwo: location.addressLineTwo,

        geoCityId: location.geoCityId,
        postcode: location.postcode,
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
);
