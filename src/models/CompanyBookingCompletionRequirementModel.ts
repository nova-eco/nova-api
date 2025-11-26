import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyBookingCompletionRequirementAttributes
  extends BaseModelAttributes {
  id: string;
  companyId: string;
  organisationBookingCompletionRequirementId: string;
  isEnabled: boolean;
  created?: Date;
  modified?: Date;
}

export class CompanyBookingCompletionRequirementModel extends BaseModel<CompanyBookingCompletionRequirementAttributes> {
  constructor() {
    super('companyBookingCompletionRequirements');
  }
}
