import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface UserAttributes extends BaseModelAttributes {
  id: string;
  userStatusId: string;
  forename: string;
  surname: string;
  username: string;
  created?: Date;
  modified?: Date;
}

export class UserModel extends BaseModel<UserAttributes> {
  constructor() {
    super('users');
  }

  /**
   * Update user details
   * @param userId The user ID
   * @param username The new username
   * @param forename The new forename
   * @param surname The new surname
   */
  async updateUserDetails(
    userId: string,
    username: string,
    forename: string,
    surname: string,
  ): Promise<void> {
    const sql = sqlLoader(path.join(__dirname, '../sql/user_updateUserDetails.sql'));
    await this.executeQuery(sql, [username, forename, surname, userId]);
  }

  /**
   * Get user emails
   * @param userId The user ID
   * @returns Array of user emails
   */
  async getUserEmails(userId: string): Promise<Array<{ email: string }>> {
    const sql = sqlLoader(path.join(__dirname, '../sql/user_getUserEmails.sql'));
    return this.executeQuery<{ email: string }>(sql, [userId]);
  }
}
