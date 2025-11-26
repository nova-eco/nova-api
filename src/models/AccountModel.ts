import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface AccountAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  userId: string;
  created?: Date;
  modified?: Date;
}

export class AccountModel extends BaseModel<AccountAttributes> {
  constructor() {
    super('accounts');
  }
}
