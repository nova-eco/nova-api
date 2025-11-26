import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationRegistrantAttributes extends BaseModelAttributes {
  id: string;
  registrationId: string;
  email: string;
  forename: string;
  surname: string;
  username: string;
  created?: Date;
  modified?: Date;
}

export class RegistrationRegistrantModel extends BaseModel<RegistrationRegistrantAttributes> {
  constructor() {
    super('registrationRegistrants');
  }
}
