import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationAttributes extends BaseModelAttributes {
  id: string;
  isEnabled: boolean;
  validUntil: Date;
  created?: Date;
  modified?: Date;
}

export class RegistrationModel extends BaseModel<RegistrationAttributes> {
  constructor() {
    super('registrations');
  }

  /**
   * Check if email exists in valid registrations
   * @param email Email address
   * @param currentDate Current date in ISO format
   * @returns Array with registration if found (empty if not found)
   */
  async checkValidRegistrationByEmail(
    email: string,
    currentDate: string,
  ): Promise<unknown[]> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/registration_checkValidRegistrationByEmail.sql'),
    );
    return this.executeQuery(sql, [currentDate, email]);
  }

  /**
   * Check if username exists in valid registrations
   * @param username Username
   * @param currentDate Current date in ISO format
   * @returns Count of matching registrations
   */
  async countValidRegistrationsByUsername(
    username: string,
    currentDate: string,
  ): Promise<number> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/registration_countValidRegistrationsByUsername.sql'),
    );
    const results = await this.executeQuery<{ count: number }>(sql, [
      currentDate,
      username,
    ]);
    return results[0]?.count || 0;
  }
}
