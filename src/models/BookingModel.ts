import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface BookingAttributes extends BaseModelAttributes {
  id: string;
  bookingPreId: string;
  servicePriceId: string;
  orderId: string;
}

export class BookingModel extends BaseModel<BookingAttributes> {
  constructor() {
    super('bookings');
  }
}
