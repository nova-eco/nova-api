import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationCompanyStaffAttributes extends BaseModelAttributes {
  id: string;
  registrationCompanyId: string;
  companyStaffRoleId: string;
  created?: Date;
  modified?: Date;
}

export class RegistrationCompanyStaffModel extends BaseModel<RegistrationCompanyStaffAttributes> {
  constructor() {
    super('registrationCompaniesStaff');
  }
}
