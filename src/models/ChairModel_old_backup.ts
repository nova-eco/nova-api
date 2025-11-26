import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ChairAttributes extends BaseModelAttributes {
  id: string;
  chairTypeId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class ChairModel extends BaseModel<ChairAttributes> {
  constructor() {
    super('chairs');
  }
}
