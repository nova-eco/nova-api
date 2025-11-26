import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface StaffAttributes extends BaseModelAttributes {
  id: string;
  accountId: string;
  companyStaffRoleId: string;
  created?: Date;
  modified?: Date;
}

export class StaffModel extends BaseModel<StaffAttributes> {
  constructor() {
    super('staff');
  }

  /**
   * Find staff by company ID with detailed user information
   * @param companyId The company ID
   * @returns Array of staff with user details
   */
  async findByCompanyId(companyId: string): Promise<
    Array<{
      id: string;
      staffRoleId: string;
      forename: string;
      surname: string;
      username: string;
      email: string;
    }>
  > {
    const sql = sqlLoader(path.join(__dirname, '../sql/staff_findByCompanyId.sql'));
    return this.executeQuery(sql, [companyId]);
  }

  /**
   * Find staff by ID with account and user information
   * @param staffId The staff ID
   * @returns Staff with account and user details or null
   */
  async findWithAccountAndUser(staffId: string): Promise<{
    staffId: string;
    companyStaffRoleId: string;
    accountId: string;
    companyId: string;
    userId: string;
    username: string;
    forename: string;
    surname: string;
  } | null> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/staff_findWithAccountAndUser.sql'),
    );
    const results = await this.executeQuery<any>(sql, [staffId]);
    return results[0] || null;
  }

  /**
   * Update staff role
   * @param staffId The staff ID
   * @param companyStaffRoleId The new company staff role ID
   */
  async updateStaffRole(staffId: string, companyStaffRoleId: string): Promise<void> {
    const sql = sqlLoader(path.join(__dirname, '../sql/staff_updateStaffRole.sql'));
    await this.executeQuery(sql, [companyStaffRoleId, staffId]);
  }
}
