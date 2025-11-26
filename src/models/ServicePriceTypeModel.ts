import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServicePriceTypeAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class ServicePriceTypeModel extends BaseModel<ServicePriceTypeAttributes> {
  constructor() {
    super('servicePriceTypes');
  }
}
