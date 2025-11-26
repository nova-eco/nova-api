import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServiceLeadAttributes extends BaseModelAttributes {
  id: string;
  serviceId: string;
  staffId: string;
}

export class ServiceLeadModel extends BaseModel<ServiceLeadAttributes> {
  constructor() {
    super('serviceLead');
  }
}
