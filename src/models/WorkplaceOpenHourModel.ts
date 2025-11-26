import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface WorkplaceOpenHourAttributes extends BaseModelAttributes {
  id: string;
  openHourId: string;
  workplaceId: string;
  dayIndexValue: number;
  created?: Date;
  modified?: Date;
}

export class WorkplaceOpenHourModel extends BaseModel<WorkplaceOpenHourAttributes> {
  constructor() {
    super('workplaceOpenHours');
  }

  /**
   * Find workplace open hour IDs by workplace ID
   * @param workplaceId The workplace ID
   * @returns Array of workplace open hour IDs
   */
  async findIdsByWorkplaceId(workplaceId: string): Promise<string[]> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/workplaceOpenHour_findIdsByWorkplaceId.sql'),
    );
    const results = await this.executeQuery<{ id: string }>(sql, [workplaceId]);
    return results.map((r) => r.id);
  }

  /**
   * Find workplace open hours by company ID with details
   * @param companyId The company ID
   * @returns Array of workplace open hours with detailed information
   */
  async findByCompanyIdWithDetails(companyId: string): Promise<
    Array<{
      id: string;
      workplaceId: string;
      openHourId: string;
      openHourTypeId: string;
      dayIndexValue: number;
      twentyFourHourValue: number;
      minuteValue: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/workplaceOpenHour_findByCompanyIdWithDetails.sql'),
    );
    return this.executeQuery(sql, [companyId]);
  }
}
