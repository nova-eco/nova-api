import { BookingPreModel, CompanyModel, SalonModel, ServiceModel } from '@app/models';
import { Temporal as TemporalNamespace } from '@js-temporal/polyfill';

export type Temporal = typeof TemporalNamespace;

export type PreBookingContext = {
  body: Record<string, any>;
  // model instances (injected by router)
  bookingPreModel: BookingPreModel;
  companyModel: CompanyModel;
  salonModel: SalonModel;
  serviceModel: ServiceModel;

  // intermediate values filled by handlers
  serviceId?: string;
  staffId?: string;
  startDateYear?: number;
  startDateMonth?: number;
  startDateMonthDay?: number;
  startDate?: any; // Temporal.PlainDate
  todayDate?: any;
  userId?: string;
  salonId?: string;
  seatId?: string;
  salonTimeSlotSequenceNumber?: number;
  service?: any;
  companyId?: string;
  company?: any;
  staff?: any;
  user?: any;
  salon?: any;
  seat?: any;
  haircutDurations?: Array<any>;
  salonTimeSlotDurations?: Array<any>;
  salonStartEndTimeSlotIds?: Array<any>;
  companyPreBookingDuration?: Array<any>;
  validUntilTimestampSeconds?: number;

  // result
  result?: any;
};
