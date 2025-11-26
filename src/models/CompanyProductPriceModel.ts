import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductPriceAttributes extends BaseModelAttributes {
  id: string;
  companyProductId: string;
  companyProductPriceTypeId: string;
  currencyId: string;
  price: number;
  priceMajorUnitValue: number;
  priceMinorUnitValue: number;
  created?: Date;
  modified?: Date;
}

export class CompanyProductPriceModel extends BaseModel<CompanyProductPriceAttributes> {
  constructor() {
    super('companyProductPrices');
  }
}
