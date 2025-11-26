import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OrderServicePriceAttributes extends BaseModelAttributes {
  id: string;
  servicePriceId: string;
  orderId: string;
}

export class OrderServicePriceModel extends BaseModel<OrderServicePriceAttributes> {
  constructor() {
    super('orderServicePrices');
  }
}
