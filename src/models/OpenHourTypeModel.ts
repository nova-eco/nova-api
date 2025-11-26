import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OpenHourTypeAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  openHourTypeOrderValue: number;
  created?: Date;
  modified?: Date;
}

export class OpenHourTypeModel extends BaseModel<OpenHourTypeAttributes> {
  constructor() {
    super('openHourTypes');
  }

  /**
   * Find all open hour types ordered by openHourTypeOrderValue
   * @returns Array of all open hour types sorted by order value
   */
  async findAllOrdered(): Promise<
    Array<{
      id: string;
      description: string;
      name: string;
      openHourTypeOrderValue: number;
    }>
  > {
    const sql = sqlLoader(path.join(__dirname, '../sql/openHourType_findAllOrdered.sql'));
    return this.executeQuery(sql);
  }
}
