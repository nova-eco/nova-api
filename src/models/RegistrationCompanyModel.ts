import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationCompanyAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  registrationId: string;
  created?: Date;
  modified?: Date;
}

export class RegistrationCompanyModel extends BaseModel<RegistrationCompanyAttributes> {
  constructor() {
    super('registrationCompanies');
  }
}
