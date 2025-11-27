import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface PasswordAttributes extends BaseModelAttributes {
  id: string;
  userId: string;
  userPasswordSequenceNumber: number;
  password: string;
}

export class PasswordModel extends BaseModel<PasswordAttributes> {
  constructor() {
    super('passwords');
  }

  async getLatestPassword(): Promise<{ password: string }> {
    return {
      password: 'password123',
    };
  }
}
