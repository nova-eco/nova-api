import { BookingPreModel, CompanyModel } from '@app/models';

/**
 * Context for BookingAvailabilityEngine
 * - `params` holds route params
 * - `result` will contain the engine output (preBookings list)
 */
export type BookingAvailabilityContext = {
  params: Record<string, any>;
  companyId?: string | null;
  bookingPreModel: BookingPreModel;
  companyModel: CompanyModel;
  result?: any;
};

export default BookingAvailabilityContext;
