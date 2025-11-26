import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface AppointmentAttributes extends BaseModelAttributes {
  id: string;
  bookingId: string;
  startDateYear: number;
  startDateMonth: number;
  startDateMonthDay: number;
  created?: Date;
  modified?: Date;
}

export class AppointmentModel extends BaseModel<AppointmentAttributes> {
  constructor() {
    super('appointments');
  }

  /**
   * Check for appointment clashes for a booking and staff
   * @param bookingId Booking ID
   * @param staffId Staff ID
   * @returns Array with appointment if clash found (empty if no clash)
   */
  async checkAppointmentClash(bookingId: string, staffId: string): Promise<any[]> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/appointment_checkAppointmentClash.sql'),
    );
    return this.executeQuery(sql, [bookingId, staffId]);
  }
}
