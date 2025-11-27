import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface BookingPreAttributes extends BaseModelAttributes {
  id: string;
  companyProductId: string;
  endWorkplaceTimeSlotId: string;
  staffId: string;
  startWorkplaceTimeSlotId: string;
  userId: string;
  workplaceId: string;
  workplaceChairId: string;
  startDateMonth: number;
  startDateMonthDay: number;
  startDateYear: number;
  validUntilTimestampSeconds: number;
  created?: Date;
  modified?: Date;
}

export class BookingPreModel extends BaseModel<BookingPreAttributes> {
  constructor() {
    super('bookingPre');
  }

  /**
   * Check for pre-booking chair clashes
   * @param seatId The seat ID
   * @param startDateYear Start date year
   * @param startDateMonth Start date month
   * @param startDateMonthDay Start date month day
   * @param salonTimeSlotSequenceNumber Salon timeslot sequence number
   * @returns Array of clashing pre-bookings
   */
  async findPreBookingChairClashes(
    seatId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateMonthDay: number,
    salonTimeSlotSequenceNumber: number,
  ): Promise<Array<{ bookingPreId: string }>> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/bookingPre_findPreBookingChairClashes.sql'),
    );
    return this.executeQuery<{ bookingPreId: string }>(sql, [
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      seatId,
      salonTimeSlotSequenceNumber,
      salonTimeSlotSequenceNumber,
    ]);
  }

  /**
   * Check for pre-booking staff clashes
   * @param staffId The staff ID
   * @param startDateYear Start date year
   * @param startDateMonth Start date month
   * @param startDateMonthDay Start date month day
   * @param salonTimeSlotSequenceNumber Salon timeslot sequence number
   * @returns Array of clashing pre-bookings
   */
  async findPreBookingStaffClashes(
    staffId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateMonthDay: number,
    salonTimeSlotSequenceNumber: number,
  ): Promise<Array<{ staffId: string }>> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/bookingPre_findPreBookingStaffClashes.sql'),
    );
    return this.executeQuery<{ staffId: string }>(sql, [
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      staffId,
      salonTimeSlotSequenceNumber,
      salonTimeSlotSequenceNumber,
    ]);
  }

  /**
   * Check for pre-booking user clashes
   * @param userId The user ID
   * @param startDateYear Start date year
   * @param startDateMonth Start date month
   * @param startDateMonthDay Start date month day
   * @param salonTimeSlotSequenceNumber Salon timeslot sequence number
   * @returns Array of clashing pre-bookings
   */
  async findPreBookingUserClashes(
    userId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateMonthDay: number,
    salonTimeSlotSequenceNumber: number,
  ): Promise<Array<{ userId: string }>> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/bookingPre_findPreBookingUserClashes.sql'),
    );
    return this.executeQuery<{ userId: string }>(sql, [
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      userId,
      salonTimeSlotSequenceNumber,
      salonTimeSlotSequenceNumber,
    ]);
  }

  /**
   * Get pre-booking timeslots for staff on a specific date
   * @param serviceId Service ID
   * @param staffId Staff ID
   * @param startDateYear Year
   * @param startDateMonth Month
   * @param startDateMonthDay Day
   * @param salonId Salon ID
   * @returns Array of pre-booking timeslots
   */
  async getPreBookingTimeSlots(
    serviceId: string,
    staffId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateMonthDay: number,
    salonId: string,
  ): Promise<
    Array<{
      id: string;
      salonId: string;
      seatId: string;
      staffId: string;
      serviceId: string;
      startSequenceNumber: number;
      endSequenceNumber: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/bookingPre_getPreBookingTimeSlots.sql'),
    );
    return this.executeQuery(sql, [
      serviceId,
      staffId,
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      salonId,
    ]);
  }

  /**
   * Get pre-bookings by company
   * @param companyId Company ID
   * @returns Array of active pre-bookings
   */
  async getPreBookingsByCompany(companyId: string): Promise<
    Array<{
      id: string;
      serviceId: string;
      staffId: string;
      userId: string;
      salonId: string;
      seatId: string;
      startDateMonth: number;
      startDateMonthDay: number;
      startDateYear: number;
      validUntilTimestampSeconds: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/bookingPre_getPreBookingsByCompany.sql'),
    );
    return this.executeQuery(sql, [companyId]);
  }
}
