import { routerOptions } from '@app/config';
import BookingEngine from '@app/engines/BookingEngine';
import {
  AppointmentClientModel,
  AppointmentLeadModel,
  AppointmentModel,
  AppointmentServiceModel,
  BookingModel,
  BookingPreModel,
  ChairAppointmentModel,
  OrderBalanceModel,
  OrderModel,
  OrderServicePriceModel,
  ServiceLeadModel,
  ServiceModel,
  ServicePriceModel,
  StaffModel,
  UserModel,
} from '@app/models';
import { Router } from 'express';

export const bookingRouterPostBooking = Router(routerOptions).post(
  '/',
  async (req, res, next) => {
    try {
      const { body } = req;

      const appointmentModel = new AppointmentModel();
      const bookingPreModel = new BookingPreModel();
      const serviceModel = new ServiceModel();
      const servicePriceModel = new ServicePriceModel();
      const staffModel = new StaffModel();
      const userModel = new UserModel();
      const orderModel = new OrderModel();
      const orderBalanceModel = new OrderBalanceModel();
      const orderServicePriceModel = new OrderServicePriceModel();
      const bookingModel = new BookingModel();
      const appointmentClientModel = new AppointmentClientModel();
      const appointmentServiceModel = new AppointmentServiceModel();
      const appointmentLeadModel = new AppointmentLeadModel();
      const chairAppointmentModel = new ChairAppointmentModel();
      const serviceLeadModel = new ServiceLeadModel();

      const engine = BookingEngine.defaultChain();

      const ctx = {
        body,
        appointmentModel,
        bookingPreModel,
        serviceModel,
        servicePriceModel,
        staffModel,
        userModel,
        orderModel,
        orderBalanceModel,
        orderServicePriceModel,
        bookingModel,
        appointmentClientModel,
        appointmentServiceModel,
        appointmentLeadModel,
        chairAppointmentModel,
        serviceLeadModel,
      } as any;

      const resultCtx = await engine.run(ctx);

      const response = resultCtx.result || { bookingId: null };
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  },
);
