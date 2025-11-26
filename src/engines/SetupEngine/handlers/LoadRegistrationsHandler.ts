import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadRegistrationsHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const Registration = models.Registration;
    const RegistrationCompany = models.RegistrationCompany;
    const RegistrationRegistrant = models.RegistrationRegistrant;
    const RegistrationCompanyStaff = models.RegistrationCompanyStaff;

    const registrations = await Registration.findAll({
      attributes: [
        'id',
        'isEnabled',
        'validUntil',
        [db.col('RegistrationCompany.companyId'), 'companyId'],
        [db.col('RegistrationRegistrant.email'), 'email'],
        [db.col('RegistrationRegistrant.forename'), 'forename'],
        [db.col('RegistrationRegistrant.surname'), 'surname'],
        [db.col('RegistrationRegistrant.username'), 'username'],
      ],
      include: [
        {
          model: RegistrationCompany,
          required: true,
          attributes: [],
          where: { companyId: ctx.companyId },
          include: [{ model: RegistrationCompanyStaff, required: true, attributes: [] }],
        },
        { model: RegistrationRegistrant, required: true, attributes: [] },
      ],
    });

    ctx.response['staffRegistrations'] = registrations;
  }
}

export default LoadRegistrationsHandler;
