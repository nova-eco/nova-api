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

/**
 * BookingEngine execution context
 *
 * Contains request payload (`body`), model instances used by handlers,
 * and slots for loaded entities produced by handlers.
 */
export type BookingContext = {
  body: Record<string, any>;
  result?: any;
  // model instances (created by router and injected into engine)
  appointmentModel: AppointmentModel;
  bookingPreModel: BookingPreModel;
  serviceModel: ServiceModel;
  servicePriceModel: ServicePriceModel;
  staffModel: StaffModel;
  userModel: UserModel;
  orderModel: OrderModel;
  orderBalanceModel: OrderBalanceModel;
  orderServicePriceModel: OrderServicePriceModel;
  bookingModel: BookingModel;
  appointmentClientModel: AppointmentClientModel;
  appointmentServiceModel: AppointmentServiceModel;
  appointmentLeadModel: AppointmentLeadModel;
  chairAppointmentModel: ChairAppointmentModel;
  serviceLeadModel: ServiceLeadModel;
  // loaded entities
  bookingPre?: Record<string, any> | null;
  servicePrice?: Record<string, any> | null;
  service?: Record<string, any> | null;
  user?: Record<string, any> | null;
  order?: Record<string, any> | null;
  orderServicePrice?: Record<string, any> | null;
  orderBalance?: Record<string, any> | null;
  booking?: Record<string, any> | null;
  serviceLead?: Record<string, any> | null;
  staff?: Record<string, any> | null;
  appointment?: Record<string, any> | null;
  appointmentClient?: Record<string, any> | null;
  appointmentService?: Record<string, any> | null;
  appointmentLead?: Record<string, any> | null;
  chairAppointment?: Record<string, any> | null;
};

export default BookingContext;
