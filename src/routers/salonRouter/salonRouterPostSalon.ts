import { routerOptions } from '@app/config';
import { Router } from 'express';
import { Db } from '@app/core/api/Db';

export const salonRouterPostSalon = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const db = Db.getDb();
      const { models } = db;
      const { Company, Location, TemporalDuration, Salon } = models;
      const { body } = req;

      const companyId =
        typeof body['companyId'] !== 'undefined' ? body['companyId'] : null;

      if (companyId === null) {
        throw new Error('salonRouterPostSalon: companyId: not found');
      }

      console.log({ companyId });
      const company = await Company.findByPk(companyId);

      if (company === null) {
        throw new Error('salonRouterPostSalon: company: not found');
      }

      const locationId =
        typeof body['locationId'] !== 'undefined' ? body['locationId'] : null;

      if (locationId === null) {
        throw new Error('salonRouterPostSalon: locationId: not found');
      }

      const location = await Location.findByPk(locationId);

      if (location === null) {
        throw new Error('salonRouterPostSalon: location: not found');
      }

      const description =
        typeof body['description'] !== 'undefined' ? body['description'] : null;

      if (description === null) {
        throw new Error('salonRouterPostSalon: description: not found');
      }

      const name = typeof body['name'] !== 'undefined' ? body['name'] : null;

      if (name === null) {
        throw new Error('salonRouterPostSalon: name: not found');
      }

      const temporalDurationId =
        typeof body['temporalDurationId'] !== 'undefined'
          ? body['temporalDurationId']
          : null;

      if (temporalDurationId === null) {
        throw new Error('salonRouterPostSalon: temporalDurationId: not found');
      }

      const temporalDuration = await TemporalDuration.findOne({
        where: {
          id: temporalDurationId,
        },
      });

      if (temporalDuration === null) {
        throw new Error('salonRouterPostSalon: temporalDuration: not found');
      }

      const salon = await Salon.create({
        companyId,
        locationId,
        description,
        name,
        timeSlotTemporalDurationId: temporalDurationId,
      });

      console.log({ salon });
      if (salon === null) {
        throw new Error('salonRouterPostSalon: salon: not created');
      }

      const salonJSON = salon.toJSON();
      delete salonJSON['createdAt'];
      delete salonJSON['updatedAt'];
      delete salonJSON['timeSlotTemporalDurationId'];
      salonJSON['temporalDurationId'] = temporalDurationId;
      salonJSON['seatIds'] = [];
      salonJSON['staffIds'] = [];
      salonJSON['salonOpenHourIds'] = [];

      res.status(201).json(salonJSON);
    } catch (error) {
      next(error);
    }
  },
);
