import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface UserEmailAttributes extends BaseModelAttributes {
  id: string;
  userId: string;
  email: string;
  created?: Date;
  modified?: Date;
}

export class UserEmailModel extends BaseModel<UserEmailAttributes> {
  constructor() {
    super('userEmails');
  }
}
