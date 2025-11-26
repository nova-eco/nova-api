import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface WorkplaceChairCompanyProductAttributes extends BaseModelAttributes {
  id: string;
  companyProductId: string;
  workplaceChairId: string;
  created?: Date;
  modified?: Date;
}

export class WorkplaceChairCompanyProductModel extends BaseModel<WorkplaceChairCompanyProductAttributes> {
  constructor() {
    super('workplaceChairCompanyProducts');
  }
}
