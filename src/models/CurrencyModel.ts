import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CurrencyAttributes extends BaseModelAttributes {
  id: string;
  name: string;
  abbreviation: string;
  symbol: string;
  created?: Date;
  modified?: Date;
}

export class CurrencyModel extends BaseModel<CurrencyAttributes> {
  constructor() {
    super('currencies');
  }
}
