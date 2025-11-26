import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ChairAppointmentAttributes extends BaseModelAttributes {
  id: string;
  appointmentId: string;
  endSalonTimeSlotId?: string;
  startSalonTimeSlotId?: string;
  seatId?: string;
}

export class ChairAppointmentModel extends BaseModel<ChairAppointmentAttributes> {
  constructor() {
    // SQL uses workplaceChairAppointments in schema; use that table name to match SQL
    super('workplaceChairAppointments');
  }
}
