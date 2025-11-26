import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface WorkplaceChairAttributes extends BaseModelAttributes {
  id: string;
  chairId: string;
  workplaceId: string;
  created?: Date;
  modified?: Date;
}

export class WorkplaceChairModel extends BaseModel<WorkplaceChairAttributes> {
  constructor() {
    super('workplaceChairs');
  }

  /**
   * Find workplace chair IDs by workplace ID
   * @param workplaceId The workplace ID
   * @returns Array of workplace chair IDs
   */
  async findIdsByWorkplaceId(workplaceId: string): Promise<string[]> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/workplaceChair_findIdsByWorkplaceId.sql'),
    );
    const results = await this.executeQuery<{ id: string }>(sql, [workplaceId]);
    return results.map((r) => r.id);
  }
}
