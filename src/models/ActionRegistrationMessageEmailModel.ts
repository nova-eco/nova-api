import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ActionRegistrationMessageEmailAttributes extends BaseModelAttributes {
  id: string;
  actionId: string;
  registrationMessageId: string;
  templateId: string;
}

export class ActionRegistrationMessageEmailModel extends BaseModel<ActionRegistrationMessageEmailAttributes> {
  constructor() {
    super('actionRegistrationMessageEmails');
  }
}
