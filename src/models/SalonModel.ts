import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface SalonAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  locationId: string;
  timeSlotTemporalDurationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class SalonModel extends BaseModel<SalonAttributes> {
  constructor() {
    super('salons');
  }

  /**
   * Find salons by company ID with location details
   * @param companyId The company ID
   * @returns Array of salons with location information
   */
  async findByCompanyId(companyId: string): Promise<
    Array<{
      id: string;
      companyId: string;
      locationId: string;
      name: string;
      description: string;
      temporalDurationId: string;
    }>
  > {
    const sql = sqlLoader(path.join(__dirname, '../sql/salon_findByCompanyId.sql'));
    return this.executeQuery(sql, [companyId]);
  }

  /**
   * Get staff IDs for a salon
   * @param salonId The salon ID
   * @returns Array of staff IDs
   */
  async getStaffIds(salonId: string): Promise<string[]> {
    const sql = sqlLoader(path.join(__dirname, '../sql/salon_getStaffIds.sql'));
    const results = await this.executeQuery<{ id: string }>(sql, [salonId]);
    return results.map((r) => r.id);
  }

  /**
   * Get seat IDs for a salon
   * @param salonId The salon ID
   * @returns Array of seat IDs
   */
  async getSeatIds(salonId: string): Promise<string[]> {
    const sql = sqlLoader(path.join(__dirname, '../sql/salon_getSeatIds.sql'));
    const results = await this.executeQuery<{ id: string }>(sql, [salonId]);
    return results.map((r) => r.id);
  }

  /**
   * Check if staff is associated with salon
   * @param salonId The salon ID
   * @param staffId The staff ID
   * @returns Array of matching staff (empty if not found)
   */
  async checkSalonStaff(
    salonId: string,
    staffId: string,
  ): Promise<Array<{ staffId: string }>> {
    const sql = sqlLoader(path.join(__dirname, '../sql/salon_checkSalonStaff.sql'));
    return this.executeQuery<{ staffId: string }>(sql, [salonId, staffId]);
  }

  /**
   * Get salon product staff with availability data
   * @param salonId The salon ID
   * @param serviceId The service/haircut ID
   * @returns Array of staff associated with the product at the salon
   */
  async getSalonProductStaff(
    salonId: string,
    serviceId: string,
  ): Promise<
    Array<{
      salonId: string;
      haircutId: string;
      staffId: string;
    }>
  > {
    const sql = sqlLoader(path.join(__dirname, '../sql/salon_getSalonProductStaff.sql'));
    return this.executeQuery(sql, [salonId, serviceId]);
  }

  /**
   * Get salon timeslot durations
   * @param salonId The salon ID
   * @returns Salon timeslot duration info
   */
  async getSalonTimeSlotDuration(salonId: string): Promise<
    Array<{
      salonId: string;
      durationMins: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/salon_getSalonTimeSlotDuration.sql'),
    );
    return this.executeQuery(sql, [salonId]);
  }

  /**
   * Get salon start and end timeslot IDs based on sequence numbers
   * @param salonId The salon ID
   * @param startSequenceNumber Start sequence number
   * @param endSequenceNumber End sequence number
   * @returns Timeslot IDs
   */
  async getSalonStartEndTimeSlotIds(
    salonId: string,
    startSequenceNumber: number,
    endSequenceNumber: number,
  ): Promise<
    Array<{
      salonId: string;
      startSalonTimeSlotId: string;
      endSalonTimeSlotId: string;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/salon_getSalonStartEndTimeSlotIds.sql'),
    );
    return this.executeQuery(sql, [salonId, startSequenceNumber, endSequenceNumber]);
  }

  /**
   * Get salon product staff timeslots with availability
   * @param serviceId Service ID
   * @param staffId Staff ID
   * @param salonId Salon ID
   * @param startDateYear Year
   * @param startDateMonth Month
   * @param startDateMonthDay Day
   * @returns Array of available timeslots
   */
  async getSalonProductStaffTimeSlots(
    serviceId: string,
    staffId: string,
    salonId: string,
    startDateYear: number,
    startDateMonth: number,
    startDateMonthDay: number,
  ): Promise<
    Array<{
      salonId: string;
      staffId: string;
      seatId: string;
      haircutId: string;
      haircutDurationMins: number;
      salonTimeSlotSequenceNumber: number;
      startDateYear: number;
      startDateMonth: number;
      startDateMonthDay: number;
      startHour: number;
      startMin: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/salon_getSalonProductStaffTimeSlots.sql'),
    );
    return this.executeQuery(sql, [
      startDateYear,
      startDateMonth,
      startDateMonthDay,
      serviceId,
      staffId,
      salonId,
    ]);
  }
}
