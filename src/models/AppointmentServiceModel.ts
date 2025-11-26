import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface AppointmentServiceAttributes extends BaseModelAttributes {
  id: string;
  appointmentId: string;
  serviceId: string;
}

export class AppointmentServiceModel extends BaseModel<AppointmentServiceAttributes> {
  constructor() {
    super('appointmentServices');
  }
}
