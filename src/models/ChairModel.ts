import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ChairAttributes extends BaseModelAttributes {
  id: string;
  seatId: string;
  salonId: string;
  created?: Date;
  modified?: Date;
}

export class ChairModel extends BaseModel<ChairAttributes> {
  constructor() {
    super('chairs');
  }

  /**
   * Find chair IDs by salon ID
   * @param salonId The salon ID
   * @returns Array of chair IDs
   */
  async findIdsBySalonId(salonId: string): Promise<string[]> {
    const sql = sqlLoader(path.join(__dirname, '../sql/chair_findIdsBySalonId.sql'));
    const results = await this.executeQuery<{ id: string }>(sql, [salonId]);
    return results.map((r) => r.id);
  }
}
