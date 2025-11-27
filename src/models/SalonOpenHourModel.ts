import path from 'node:path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface SalonOpenHourAttributes extends BaseModelAttributes {
  id: string;
  openHourId: string;
  salonId: string;
  dayIndexValue: number;
  created?: Date;
  modified?: Date;
}

export class SalonOpenHourModel extends BaseModel<SalonOpenHourAttributes> {
  constructor() {
    super('salonOpenHours');
  }

  /**
   * Find salon open hour IDs by salon ID
   * @param salonId The salon ID
   * @returns Array of salon open hour IDs
   */
  async findIdsBySalonId(salonId: string): Promise<string[]> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/salonOpenHour_findIdsBySalonId.sql'),
    );
    const results = await this.executeQuery<{ id: string }>(sql, [salonId]);
    return results.map((r) => r.id);
  }

  /**
   * Find salon open hours by company ID with details
   * @param companyId The company ID
   * @returns Array of salon open hours with detailed information
   */
  async findByCompanyIdWithDetails(companyId: string): Promise<
    Array<{
      id: string;
      salonId: string;
      openHourId: string;
      openHourTypeId: string;
      dayIndexValue: number;
      twentyFourHourValue: number;
      minuteValue: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/salonOpenHour_findByCompanyIdWithDetails.sql'),
    );
    return this.executeQuery(sql, [companyId]);
  }
}
