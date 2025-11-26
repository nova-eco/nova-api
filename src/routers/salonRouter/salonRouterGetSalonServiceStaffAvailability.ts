import { routerOptions } from '@app/config';
import { BookingPreModel, SalonModel, ServiceModel, StaffModel } from '@app/models';
import { Router } from 'express';

export const salonRouterGetSalonProductStafAvailability = Router(routerOptions).get(
  '/',
  async (req, res, next) => {
    try {
      const bookingPreModel = new BookingPreModel();
      const serviceModel = new ServiceModel();
      const staffModel = new StaffModel();
      const salonModel = new SalonModel();
      const { params, query } = req;

      const serviceId =
        typeof params['serviceId'] !== 'undefined' ? params['serviceId'] : null;

      const staffId = typeof params['staffId'] !== 'undefined' ? params['staffId'] : null;

      const salonId = typeof params['salonId'] !== 'undefined' ? params['salonId'] : null;

      if (serviceId === null) {
        throw new Error(
          'salonRouterGetSalonProductStafAvailability: serviceId: not found',
        );
      }

      if (staffId === null) {
        throw new Error('salonRouterGetSalonProductStafAvailability: salonId: not found');
      }

      if (salonId === null) {
        throw new Error('salonRouterGetSalonProductStafAvailability: salonId: not found');
      }

      const service = await serviceModel.findByPk(serviceId);
      const staff = await staffModel.findByPk(staffId);
      const salon = await salonModel.findByPk(salonId);

      if (service === null) {
        throw new Error('salonRouterGetSalonProductStafAvailability: service: not found');
      }

      if (staff === null) {
        throw new Error('salonRouterGetSalonProductStafAvailability: staff: not found');
      }

      if (salon === null) {
        throw new Error('salonRouterGetSalonProductStafAvailability: salon: not found');
      }

      const startDateYear =
        typeof query['startDateYear'] !== 'undefined' ? query['startDateYear'] : null;

      const startDateMonth =
        typeof query['startDateMonth'] !== 'undefined' ? query['startDateMonth'] : null;

      const startDateMonthDay =
        typeof query['startDateMonthDay'] !== 'undefined'
          ? query['startDateMonthDay']
          : null;

      if (startDateYear === null) {
        throw new Error(
          'salonRouterGetSalonProductStafAvailability: startDateYear: not found',
        );
      }

      if (startDateMonth === null) {
        throw new Error(
          'salonRouterGetSalonProductStafAvailability: startDateMonth: not found',
        );
      }

      if (startDateMonthDay === null) {
        throw new Error(
          'salonRouterGetSalonProductStafAvailability: startDateMonthDay: not found',
        );
      }

      const preBookingTimeSlots = await bookingPreModel.getPreBookingTimeSlots(
        serviceId,
        staffId,
        parseInt(startDateYear as string),
        parseInt(startDateMonth as string),
        parseInt(startDateMonthDay as string),
        salonId,
      );

      const salonProductStaffTimeSlots = await salonModel.getSalonProductStaffTimeSlots(
        serviceId,
        staffId,
        salonId,
        parseInt(startDateYear as string),
        parseInt(startDateMonth as string),
        parseInt(startDateMonthDay as string),
      );

      const availabilities = [];

      for (const salonTimeSlot of salonProductStaffTimeSlots) {
        const { salonTimeSlotSequenceNumber } = salonTimeSlot;

        const preBooking = preBookingTimeSlots.find(
          (t) =>
            salonTimeSlotSequenceNumber >= t.startSequenceNumber &&
            salonTimeSlotSequenceNumber <= t.endSequenceNumber,
        );

        /*
         * Add additional checks here
         */
        if (typeof preBooking === 'undefined') {
          availabilities.push(salonTimeSlot);
        }
      }
      res.status(200).json(availabilities);
    } catch (error) {
      next(error);
    }
  },
);
