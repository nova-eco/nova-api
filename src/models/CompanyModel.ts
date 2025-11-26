import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface CompanyAttributes extends BaseModelAttributes {
  id: string;
  organisationId: string;
  description: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class CompanyModel extends BaseModel<CompanyAttributes> {
  constructor() {
    super('companies');
  }

  /**
   * Get company pre-booking duration
   * @param companyId Company ID
   * @returns Pre-booking duration info
   */
  async getCompanyPreBookingDuration(companyId: string): Promise<
    Array<{
      companyId: string;
      durationMins: number;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/company_getCompanyPreBookingDuration.sql'),
    );
    return this.executeQuery(sql, [companyId]);
  }

  /**
   * Check if company exists
   * @param companyId Company ID
   * @returns Array with company ID (empty if not found)
   */
  async checkCompanyExists(companyId: string): Promise<Array<{ id: string }>> {
    const sql = sqlLoader(path.join(__dirname, '../sql/company_checkCompanyExists.sql'));
    return this.executeQuery<{ id: string }>(sql, [companyId]);
  }
}
