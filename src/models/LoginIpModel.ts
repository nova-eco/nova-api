import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LoginIpAttributes extends BaseModelAttributes {
  id: string;
  ip: string;
}

export class LoginIpModel extends BaseModel<LoginIpAttributes> {
  constructor() {
    super('loginIps');
  }
}
