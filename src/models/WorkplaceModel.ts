import path from 'node:path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface WorkplaceAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  locationId: string;
  timeSlotTemporalDurationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class WorkplaceModel extends BaseModel<WorkplaceAttributes> {
  constructor() {
    super('workplaces');
  }

  /**
   * Find workplaces by company ID with location details
   * @param companyId The company ID
   * @returns Array of workplaces with location information
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
    const sql = sqlLoader(path.join(__dirname, '../sql/workplace_findByCompanyId.sql'));
    return this.executeQuery(sql, [companyId]);
  }

  /**
   * Get staff IDs for a workplace
   * @param workplaceId The workplace ID
   * @returns Array of staff IDs
   */
  async getStaffIds(workplaceId: string): Promise<string[]> {
    const sql = sqlLoader(path.join(__dirname, '../sql/workplace_getStaffIds.sql'));
    const results = await this.executeQuery<{ id: string }>(sql, [workplaceId]);
    return results.map((r) => r.id);
  }
}
