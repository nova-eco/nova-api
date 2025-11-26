import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServicePriceAttributes extends BaseModelAttributes {
  id: string;
  serviceId: string;
  servicePriceTypeId: string;
  currencyId: string;
  price: number;
  priceMajorUnitValue: number;
  priceMinorUnitValue: number;
  created?: Date;
  modified?: Date;
}

export class ServicePriceModel extends BaseModel<ServicePriceAttributes> {
  constructor() {
    super('servicePrices');
  }
}
