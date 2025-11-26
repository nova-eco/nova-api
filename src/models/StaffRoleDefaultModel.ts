import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface StaffRoleDefaultAttributes extends BaseModelAttributes {
  id: string;
  organisationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class StaffRoleDefaultModel extends BaseModel<StaffRoleDefaultAttributes> {
  constructor() {
    super('staffRoleDefaults');
  }
}
