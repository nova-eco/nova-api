import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface OpenHourAttributes extends BaseModelAttributes {
  id: string;
  openHourTypeId: string;
  twentyFourHourValue: number;
  minuteValue: number;
  created?: Date;
  modified?: Date;
}

export class OpenHourModel extends BaseModel<OpenHourAttributes> {
  constructor() {
    super('openHours');
  }
}
