import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LoginSessionAttributes extends BaseModelAttributes {
  id: string;
  loginId: string;
  sessionId: string;
}

export class LoginSessionModel extends BaseModel<LoginSessionAttributes> {
  constructor() {
    super('loginSessions');
  }
}
