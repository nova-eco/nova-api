import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationVerifiedAttributes extends BaseModelAttributes {
  id: string;
  registrationId: string;
  registrationMessageId: string;
}

export class RegistrationVerifiedModel extends BaseModel<RegistrationVerifiedAttributes> {
  constructor() {
    super('registrationsVerified');
  }
}
