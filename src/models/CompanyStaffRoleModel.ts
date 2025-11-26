import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyStaffRoleAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  companyStaffRoleSequenceNumber: number;
  created?: Date;
  modified?: Date;
}

export class CompanyStaffRoleModel extends BaseModel<CompanyStaffRoleAttributes> {
  constructor() {
    super('companyStaffRoles');
  }

  /**
   * Find company staff role by ID and company ID
   * @param roleId The role ID
   * @param companyId The company ID
   * @returns Company staff role or null
   */
  async findByIdAndCompany(
    roleId: string,
    companyId: string,
  ): Promise<CompanyStaffRoleAttributes | null> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/companyStaffRole_findByIdAndCompany.sql'),
    );
    const results = await this.executeQuery<CompanyStaffRoleAttributes>(sql, [
      roleId,
      companyId,
    ]);
    return results[0] || null;
  }
}
