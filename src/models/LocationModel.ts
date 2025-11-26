import * as path from 'path';
import { sqlLoader } from '@app/util/sqlLoader';
import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface LocationAttributes extends BaseModelAttributes {
  id: string;
  addressLineOne: string;
  addressLineTwo: string;
  addressLineThree: string;
  geoCityId: string;
  postcode: string;
  created?: Date;
  modified?: Date;
}

export class LocationModel extends BaseModel<LocationAttributes> {
  constructor() {
    super('locations');
  }

  /**
   * Find all locations ordered by country and city
   * @returns Array of locations sorted by country code and city name
   */
  async findAllOrderedByCountryAndCity(): Promise<
    Array<{
      id: string;
      addressLineOne: string;
      addressLineTwo: string;
      geoCityId: string;
      postcode: string;
    }>
  > {
    const sql = sqlLoader(
      path.join(__dirname, '../sql/location_findAllOrderedByCountryAndCity.sql'),
    );
    return this.executeQuery(sql);
  }
}
