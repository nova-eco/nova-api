import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface SeatTypeAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class SeatTypeModel extends BaseModel<SeatTypeAttributes> {
  constructor() {
    super('seatTypes');
  }
}
