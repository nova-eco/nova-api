import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductPeriodRoleTypeAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  organisationProductPeriodRoleTypeId: string;
  isEnabled: boolean;
  created?: Date;
  modified?: Date;
}

export class CompanyProductPeriodRoleTypeModel extends BaseModel<CompanyProductPeriodRoleTypeAttributes> {
  constructor() {
    super('companyProductPeriodRoleTypes');
  }
}
