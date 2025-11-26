import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServicePeriodRoleTypeAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  organisationProductPeriodRoleTypeId: string;
  isEnabled: boolean;
  created?: Date;
  modified?: Date;
}

export class ServicePeriodRoleTypeModel extends BaseModel<ServicePeriodRoleTypeAttributes> {
  constructor() {
    super('servicePeriodRoleTypes');
  }
}
