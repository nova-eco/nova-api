import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LoginErrorAttributes extends BaseModelAttributes {
  id: string;
  loginId: string;
  errorMessage: string;
}

export class LoginErrorModel extends BaseModel<LoginErrorAttributes> {
  constructor() {
    super('loginErrors');
  }
}
