import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface TemporalDurationAttributes extends BaseModelAttributes {
  id: string;
  durationIso: string;
  created?: Date;
  modified?: Date;
}

export class TemporalDurationModel extends BaseModel<TemporalDurationAttributes> {
  constructor() {
    super('temporalDurations');
  }
}
