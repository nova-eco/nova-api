import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ChairServiceAttributes extends BaseModelAttributes {
  id: string;
  serviceId: string;
  chairId: string;
  created?: Date;
  modified?: Date;
}

export class ChairServiceModel extends BaseModel<ChairServiceAttributes> {
  constructor() {
    super('chairServices');
  }

  /**
   * Delete all chair services for a seat
   * @param seatId Seat ID
   */
  async deleteAllForSeat(seatId: string): Promise<void> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/chairService_deleteAllForSeat.sql'),
    );
    await this.executeQuery(sql, [seatId]);
  }
}
