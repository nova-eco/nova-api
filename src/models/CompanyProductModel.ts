import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  productId: string;
  created?: Date;
  modified?: Date;
}

export class CompanyProductModel extends BaseModel<CompanyProductAttributes> {
  constructor() {
    super('companyProducts');
  }
}
