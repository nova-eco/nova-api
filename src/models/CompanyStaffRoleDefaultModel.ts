import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyStaffRoleDefaultAttributes extends BaseModelAttributes {
  id: string;
  companyStaffRoleId: string;
  staffRoleDefaultId: string;
  created?: Date;
  modified?: Date;
}

export class CompanyStaffRoleDefaultModel extends BaseModel<CompanyStaffRoleDefaultAttributes> {
  constructor() {
    super('companyStaffRoleDefaults');
  }
}
