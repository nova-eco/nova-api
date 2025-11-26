import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface GeoCityAttributes extends BaseModelAttributes {
  id: string;
  geoCountryId: string;
  name: string;
  created?: Date;
  modified?: Date;
}

export class GeoCityModel extends BaseModel<GeoCityAttributes> {
  constructor() {
    super('geoCities');
  }

  /**
   * Find all geo cities with country information
   * @returns Array of cities with country reference, ordered by ID
   */
  async findAllWithCountry(): Promise<
    Array<{
      id: string;
      geoCountryId: string;
      name: string;
    }>
  > {
    const sql = `
      SELECT
        gc.id                               AS        id                ,
        gn.id                               AS        geoCountryId      ,
        gc.name                             AS        name

      FROM geoCities                        AS gc
      INNER JOIN geoCountries               AS gn     ON gc.geoCountryId = gn.id

      ORDER BY gc.id ASC
    `;

    return this.executeQuery(sql);
  }
}
