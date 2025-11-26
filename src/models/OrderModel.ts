import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OrderAttributes extends BaseModelAttributes {
  id: string;
  userId: string;
  orderTimestamp: number;
}

export class OrderModel extends BaseModel<OrderAttributes> {
  constructor() {
    super('orders');
  }
}
