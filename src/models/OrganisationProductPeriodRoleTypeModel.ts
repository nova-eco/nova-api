import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OrganisationProductPeriodRoleTypeAttributes extends BaseModelAttributes {
  id: string;
  organisationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class OrganisationProductPeriodRoleTypeModel extends BaseModel<OrganisationProductPeriodRoleTypeAttributes> {
  constructor() {
    super('organisationProductPeriodRoleTypes');
  }
}
