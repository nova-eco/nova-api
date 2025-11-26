import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ActionAttributes extends BaseModelAttributes {
  id: string;
  performAtTimestamp: string;
  hasBeenPerformed: boolean;
}

export class ActionModel extends BaseModel<ActionAttributes> {
  constructor() {
    super('actions');
  }
}
