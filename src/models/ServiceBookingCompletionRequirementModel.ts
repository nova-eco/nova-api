import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServiceBookingCompletionRequirementAttributes
  extends BaseModelAttributes {
  id: string;
  serviceId: string;
  companyBookingCompletionRequirementId: string;
  isEnabled: boolean;
  created?: Date;
  modified?: Date;
}

export class ServiceBookingCompletionRequirementModel extends BaseModel<ServiceBookingCompletionRequirementAttributes> {
  constructor() {
    super('serviceBookingCompletionRequirements');
  }
}
