import { BookingPreAttributes } from '@app/models/BookingPreModel';

export const mockBookingPre: BookingPreAttributes = {
  id: 'booking-pre-123',
  companyProductId: 'product-1',
  endWorkplaceTimeSlotId: 'timeslot-end-1',
  staffId: 'staff-1',
  startWorkplaceTimeSlotId: 'timeslot-start-1',
  userId: 'user-1',
  workplaceId: 'workplace-1',
  workplaceChairId: 'chair-1',
  startDateMonth: 1,
  startDateMonthDay: 15,
  startDateYear: 2024,
  validUntilTimestampSeconds: 1735689600,
  created: new Date('2024-01-01'),
  modified: new Date('2024-01-01'),
};

export const mockBookingPres: BookingPreAttributes[] = [
  mockBookingPre,
  {
    id: 'booking-pre-456',
    companyProductId: 'product-2',
    endWorkplaceTimeSlotId: 'timeslot-end-2',
    staffId: 'staff-2',
    startWorkplaceTimeSlotId: 'timeslot-start-2',
    userId: 'user-2',
    workplaceId: 'workplace-2',
    workplaceChairId: 'chair-2',
    startDateMonth: 2,
    startDateMonthDay: 20,
    startDateYear: 2024,
    validUntilTimestampSeconds: 1735689600,
    created: new Date('2024-01-02'),
    modified: new Date('2024-01-02'),
  },
];
