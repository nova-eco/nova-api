import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductPriceTypeAttributes extends BaseModelAttributes {
  id: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class CompanyProductPriceTypeModel extends BaseModel<CompanyProductPriceTypeAttributes> {
  constructor() {
    super('companyProductPriceTypes');
  }
}
