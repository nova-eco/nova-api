import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OrganisationBookingCompletionRequirementAttributes
  extends BaseModelAttributes {
  id: string;
  organisationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class OrganisationBookingCompletionRequirementModel extends BaseModel<OrganisationBookingCompletionRequirementAttributes> {
  constructor() {
    super('organisationBookingCompletionRequirements');
  }
}
