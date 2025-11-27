import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface SessionAttributes extends BaseModelAttributes {
  id: string;
  userId: string;
  validUntilTimestamp: number;
  created?: Date;
  modified?: Date;
}

export class SessionModel extends BaseModel<SessionAttributes> {
  constructor() {
    super('sessions');
  }

  /**
   * Find active session for user
   * @param userId The user ID
   * @param currentTimestamp Current timestamp
   * @returns Active session or null
   */
  async findActiveSession(
    userId: string,
    currentTimestamp: number,
  ): Promise<SessionAttributes | null> {
    const sql = sqlLoader(path.join(__dirname, '../sql/session_findActiveSession.sql'));
    const results = await this.executeQuery<SessionAttributes>(sql, [
      userId,
      currentTimestamp,
    ]);
    return results[0] || null;
  }

  /**
   * Invalidate session by ID
   * @param sessionId The session ID
   * @param timestamp Timestamp to set as validUntil
   */
  async invalidateSession(sessionId: string, timestamp: number): Promise<void> {
    const sql = sqlLoader(path.join(__dirname, '../sql/session_invalidateSession.sql'));
    await this.executeQuery(sql, [timestamp, sessionId]);
  }

  /**
   * Get latest password for user
   * @param userId The user ID
   * @returns Password record or null
   */
  async getLatestPassword(userId: string): Promise<{ password: string } | null> {
    const sql = sqlLoader(path.join(__dirname, '../sql/session_getLatestPassword.sql'));
    const results = await this.executeQuery<{ password: string }>(sql, [userId]);
    return results[0] || null;
  }
}

export class PasswordModel extends BaseModel<{
  id: string;
  userId: string;
  password: string;
  userPasswordSequenceNumber: number;
}> {
  constructor() {
    super('passwords');
  }

  /**
   * Get latest password for user
   * @param userId The user ID
   * @returns Password record or null
   */
  async getLatestPassword(userId: string): Promise<{ password: string } | null> {
    const sql = sqlLoader(path.join(__dirname, '../sql/password_getLatestPassword.sql'));
    const results = await this.executeQuery<{ password: string }>(sql, [userId]);
    return results[0] || null;
  }
}
