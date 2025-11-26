import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ChairTypeAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class ChairTypeModel extends BaseModel<ChairTypeAttributes> {
  constructor() {
    super('chairTypes');
  }
}
