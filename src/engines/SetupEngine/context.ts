import {
  GeoCityModel,
  GeoCountryModel,
  LocationModel,
  OpenHourTypeModel,
  SalonModel,
  SalonOpenHourModel,
  SeatModel,
  StaffModel,
} from '@app/models';

/**
 * Context used by SetupEngine handlers
 *
 * - `params` contains Express route params
 * - `response` is a mutable object built by handlers and returned to the router
 * - model instances are injected by the router
 */
export type SetupContext = {
  params: Record<string, any>;
  userId?: string | null;
  user?: Record<string, any> | null;
  session?: Record<string, any> | null;
  account?: Record<string, any> | null;
  companyId?: string | null;
  company?: Record<string, any> | null;
  response?: Record<string, any>;
  // common models used by handlers
  staffModel: StaffModel;
  salonModel: SalonModel;
  seatModel: SeatModel;
  salonOpenHourModel: SalonOpenHourModel;
  openHourTypeModel: OpenHourTypeModel;
  locationModel: LocationModel;
  geoCityModel: GeoCityModel;
  geoCountryModel: GeoCountryModel;
};

export default SetupContext;
