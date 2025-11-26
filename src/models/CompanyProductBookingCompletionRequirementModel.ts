import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductBookingCompletionRequirementAttributes
  extends BaseModelAttributes {
  id: string;
  companyProductId: string;
  companyBookingCompletionRequirementId: string;
  isEnabled: boolean;
  created?: Date;
  modified?: Date;
}

export class CompanyProductBookingCompletionRequirementModel extends BaseModel<CompanyProductBookingCompletionRequirementAttributes> {
  constructor() {
    super('companyProductBookingCompletionRequirements');
  }
}
