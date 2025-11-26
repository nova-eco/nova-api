import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServicePeriodAttributes extends BaseModelAttributes {
  id: string;
  serviceId: string;
  servicePeriodRoleTypeId: string;
  temporalDurationId: string;
  serviceSequenceNumber: number;
  created?: Date;
  modified?: Date;
}

export class ServicePeriodModel extends BaseModel<ServicePeriodAttributes> {
  constructor() {
    super('servicePeriods');
  }
}
