import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LoginUsernameAttributes extends BaseModelAttributes {
  id: string;
  username: string;
}

export class LoginUsernameModel extends BaseModel<LoginUsernameAttributes> {
  constructor() {
    super('loginUsernames');
  }
}
