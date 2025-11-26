import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OrderBalanceAttributes extends BaseModelAttributes {
  id: string;
  orderId: string;
  balance: number;
}

export class OrderBalanceModel extends BaseModel<OrderBalanceAttributes> {
  constructor() {
    super('orderBalances');
  }
}
