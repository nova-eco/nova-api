import { BaseModel, BaseModelAttributes } from './BaseModel';

export interface GeoCountryAttributes extends BaseModelAttributes {
  id: string;
  name: string;
  threeLetterCode: string;
  created?: Date;
  modified?: Date;
}

export class GeoCountryModel extends BaseModel<GeoCountryAttributes> {
  constructor() {
    super('geoCountries');
  }

  /**
   * Find all geo countries ordered by ID
   * @returns Array of all countries sorted by ID
   */
  async findAllOrdered(): Promise<
    Array<{
      id: string;
      name: string;
      threeLetterCode: string;
    }>
  > {
    const sql = `
      SELECT
        gn.id                               AS        id                ,
        gn.name                             AS        name              ,
        gn.threeLetterCode                  AS        threeLetterCode

      FROM geoCountries                     AS gn

      ORDER BY gn.id ASC
    `;

    return this.executeQuery(sql);
  }
}
