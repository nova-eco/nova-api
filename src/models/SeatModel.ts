import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface SeatAttributes extends BaseModelAttributes {
  id: string;
  seatTypeId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class SeatModel extends BaseModel<SeatAttributes> {
  constructor() {
    super('seats');
  }
}
