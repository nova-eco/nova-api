import { BookingContext } from '../context';
import { IHandler } from '../handler';

/**
 * Creates the appointment record and all child records (appointmentClient,
 * appointmentService, appointmentLead) and the chairAppointment. Places
 * created entities on the context and sets `ctx.result` with the bookingId.
 */
export class CreateAppointmentAndChildrenHandler implements IHandler<BookingContext> {
  async handle(ctx: BookingContext) {
    const bookingId = (ctx as any).bookingId;

    const startDateYear =
      ctx.bookingPre && ctx.bookingPre['startDateYear']
        ? ctx.bookingPre['startDateYear']
        : null;
    if (startDateYear === null)
      throw new Error('bookingRouterPostBooking: startDateYear: not found.');

    const startDateMonth =
      ctx.bookingPre && ctx.bookingPre['startDateMonth']
        ? ctx.bookingPre['startDateMonth']
        : null;
    if (startDateMonth === null)
      throw new Error('bookingRouterPostBooking: startDateMonth: not found.');

    const startDateMonthDay =
      ctx.bookingPre && ctx.bookingPre['startDateMonthDay']
        ? ctx.bookingPre['startDateMonthDay']
        : null;
    if (startDateMonthDay === null)
      throw new Error('bookingRouterPostBooking: startDateMonthDay: not found.');

    const appointment = await ctx.appointmentModel.create({
      bookingId,
      startDateYear,
      startDateMonth,
      startDateMonthDay,
    });
    if (appointment === null)
      throw new Error('bookingRouterPostBooking: appointment: not created');
    ctx.appointment = appointment;

    const appointmentId = appointment['id'] ? appointment['id'] : null;

    const userId = ctx.user && ctx.user['id'] ? ctx.user['id'] : null;
    const appointmentClient = await ctx.appointmentClientModel.create({
      appointmentId,
      userId,
    });
    if (appointmentClient === null)
      throw new Error('bookingRouterPostBooking: appointmentClient: not created');
    ctx.appointmentClient = appointmentClient;

    const serviceId = ctx.service && ctx.service['id'] ? ctx.service['id'] : null;
    const appointmentService = await ctx.appointmentServiceModel.create({
      appointmentId,
      serviceId,
    });
    if (appointmentService === null)
      throw new Error('bookingRouterPostBooking: appointmentService: not created');
    ctx.appointmentService = appointmentService;

    const staffId = ctx.staff && ctx.staff['id'] ? ctx.staff['id'] : null;
    const appointmentLead = await ctx.appointmentLeadModel.create({
      appointmentId,
      staffId,
    });
    if (appointmentLead === null)
      throw new Error('bookingRouterPostBooking: appointmentLead: not created');
    ctx.appointmentLead = appointmentLead;

    const startSalonTimeSlotId =
      ctx.bookingPre && ctx.bookingPre['startSalonTimeSlotId']
        ? ctx.bookingPre['startSalonTimeSlotId']
        : null;
    if (startSalonTimeSlotId === null)
      throw new Error('bookingRouterPostBooking: startSalonTimeSlotId: not found');

    const endSalonTimeSlotId =
      ctx.bookingPre && ctx.bookingPre['endSalonTimeSlotId']
        ? ctx.bookingPre['endSalonTimeSlotId']
        : null;
    if (endSalonTimeSlotId === null)
      throw new Error('bookingRouterPostBooking: endSalonTimeSlotId: not found');

    const seatId =
      ctx.bookingPre && ctx.bookingPre['seatId'] ? ctx.bookingPre['seatId'] : null;
    if (seatId === null) throw new Error('bookingRouterPostBooking: seatId: not found');

    const chairAppointment = await ctx.chairAppointmentModel.create({
      appointmentId,
      endSalonTimeSlotId,
      startSalonTimeSlotId,
      seatId,
    });
    if (chairAppointment === null)
      throw new Error('bookingRouterPostBooking: chairAppointment: not found');
    ctx.chairAppointment = chairAppointment;

    (ctx as any).result = { bookingId: (ctx as any).bookingId };
  }
}

export default CreateAppointmentAndChildrenHandler;
