import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyProductPeriodAttributes extends BaseModelAttributes {
  id: string;
  companyProductId: string;
  companyProductPeriodRoleTypeId: string;
  temporalDurationId: string;
  companyProductSequenceNumber: number;
  created?: Date;
  modified?: Date;
}

export class CompanyProductPeriodModel extends BaseModel<CompanyProductPeriodAttributes> {
  constructor() {
    super('companyProductPeriods');
  }
}
