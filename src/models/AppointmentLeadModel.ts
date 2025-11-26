import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface AppointmentLeadAttributes extends BaseModelAttributes {
  id: string;
  appointmentId: string;
  staffId: string;
}

export class AppointmentLeadModel extends BaseModel<AppointmentLeadAttributes> {
  constructor() {
    super('appointmentLeads');
  }
}
