import { SetupContext } from '../context';
import { IHandler } from '../handler';

export class LoadStaffRolesHandler implements IHandler<SetupContext> {
  async handle(ctx: SetupContext) {
    const dbModule = await import('@app/core/api/Db');
    const db = dbModule.Db.getDb();
    const { models } = db;
    const CompanyStaffRole = models.CompanyStaffRole;
    const CompanyStaffRoleCustom = models.CompanyStaffRoleCustom;
    const CompanyStaffRoleDefault = models.CompanyStaffRoleDefault;
    const StaffRoleDefault = models.StaffRoleDefault;

    const staffRolesCustom = await CompanyStaffRole.findAll({
      attributes: [
        'id',
        [db.col('CompanyStaffRoleCustom.name'), 'description'],
        [db.col('CompanyStaffRoleCustom.name'), 'name'],
      ],
      include: [
        {
          model: models.Company,
          required: true,
          attributes: [],
          where: { id: ctx.companyId },
        },
        { model: CompanyStaffRoleCustom, required: true, attributes: [] },
      ],
    });

    const staffRolesDefaults = await CompanyStaffRole.findAll({
      attributes: [
        'id',
        [db.col('CompanyStaffRoleDefault.StaffRoleDefault.description'), 'description'],
        [db.col('CompanyStaffRoleDefault.StaffRoleDefault.name'), 'name'],
      ],
      include: [
        {
          model: models.Company,
          required: true,
          attributes: [],
          where: { id: ctx.companyId },
        },
        {
          model: CompanyStaffRoleDefault,
          required: true,
          attributes: [],
          include: [{ model: StaffRoleDefault, required: true, attributes: [] }],
        },
      ],
    });

    const staffRoles = staffRolesCustom.concat(staffRolesDefaults);
    ctx.response['staffRoles'] = staffRoles.map((s: any) => s.toJSON());
  }
}

export default LoadStaffRolesHandler;
