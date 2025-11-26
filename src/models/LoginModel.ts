import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LoginAttributes extends BaseModelAttributes {
  id: string;
  loginIpId: string;
  loginUsernameId: string;
  loginTimestamp: string | number;
}

export class LoginModel extends BaseModel<LoginAttributes> {
  constructor() {
    super('logins');
  }
}
