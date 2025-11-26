import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface ServiceAttributes extends BaseModelAttributes {
  id: string;
  companyId: string;
  productId: string;
  created?: Date;
  modified?: Date;
}

export class ServiceModel extends BaseModel<ServiceAttributes> {
  constructor() {
    super('services');
  }

  /**
   * Check if a staff member is the lead for a service
   * @param serviceId The service ID
   * @returns Array with lead staff info (empty if no lead exists)
   */
  async getServiceLead(serviceId: string): Promise<Array<{ staffId: string }>> {
    const sql = sqlLoader(path.join(__dirname, '../sql/service_getServiceLead.sql'));
    return this.executeQuery<{ staffId: string }>(sql, [serviceId]);
  }

  /**
   * Get duration of a haircut/service
   * @param serviceId The service ID
   * @returns Duration information
   */
  async getServiceDuration(serviceId: string): Promise<
    Array<{
      serviceId: string;
      durationMins: number;
      numPeriods: number;
    }>
  > {
    const sql = sqlLoader(path.join(__dirname, '../sql/service_getServiceDuration.sql'));
    return this.executeQuery(sql, [serviceId]);
  }
}
