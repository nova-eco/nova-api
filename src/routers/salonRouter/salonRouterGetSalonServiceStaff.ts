import { routerOptions } from '@app/config';
import { SalonModel, ServiceModel } from '@app/models';
import { Router } from 'express';

export const salonRouterGetSalonProductStaff = Router(routerOptions).get(
  '/',
  async (req, res, next) => {
    try {
      const serviceModel = new ServiceModel();
      const salonModel = new SalonModel();
      const { params } = req;

      const serviceId =
        typeof params['serviceId'] !== 'undefined' ? params['serviceId'] : null;

      const salonId = typeof params['salonId'] !== 'undefined' ? params['salonId'] : null;

      if (serviceId === null) {
        throw new Error('salonRouterGetSalonProductStaff: serviceId: not found');
      }

      if (salonId === null) {
        throw new Error('salonRouterGetSalonProductStaff: salonId: not found');
      }

      const service = await serviceModel.findByPk(serviceId);

      const salon = await salonModel.findByPk(salonId);

      if (service === null) {
        throw new Error('salonRouterGetSalonProductStaff: service: not found');
      }

      if (salon === null) {
        throw new Error('salonRouterGetSalonProductStaff: salon: not found');
      }

      const salonProductStaff = await salonModel.getSalonProductStaff(salonId, serviceId);

      res.status(200).json(salonProductStaff);
    } catch (error) {
      next(error);
    }
  },
);
