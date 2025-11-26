import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface AppointmentClientAttributes extends BaseModelAttributes {
  id: string;
  appointmentId: string;
  userId: string;
}

export class AppointmentClientModel extends BaseModel<AppointmentClientAttributes> {
  constructor() {
    super('appointmentClients');
  }
}
