import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface RegistrationMessageAttributes extends BaseModelAttributes {
  id: string;
  registrationId: string;
  accessCode: string;
  isEnabled: boolean;
  sequenceNumber: number;
  validUntil: Date;
  created?: Date;
  modified?: Date;
}

export class RegistrationMessageModel extends BaseModel<RegistrationMessageAttributes> {
  constructor() {
    super('registrationMessages');
  }

  /**
   * Disable all messages for a registration
   * @param registrationId Registration ID
   */
  async disableAllForRegistration(registrationId: string): Promise<void> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/registrationMessage_disableAllForRegistration.sql'),
    );
    await this.executeQuery(sql, [false, registrationId]);
  }

  /**
   * Get max sequence number for a registration
   * @param registrationId Registration ID
   * @returns Max sequence number or undefined
   */
  async getMaxSequenceNumber(registrationId: string): Promise<number | undefined> {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/registrationMessage_getMaxSequenceNumber.sql'),
    );
    const results = await this.executeQuery<{ maxSeq: number }>(sql, [registrationId]);
    return results[0]?.maxSeq;
  }
}
