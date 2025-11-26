import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyStaffRoleCustomAttributes extends BaseModelAttributes {
  id: string;
  companyStaffRoleId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class CompanyStaffRoleCustomModel extends BaseModel<CompanyStaffRoleCustomAttributes> {
  constructor() {
    super('companyStaffRoleCustoms');
  }
}
