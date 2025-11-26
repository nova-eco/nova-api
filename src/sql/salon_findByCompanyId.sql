SELECT
  w.id                                      AS id                   ,
  c.id                                      AS companyId            ,
  l.id                                      AS locationId           ,
  w.name                                    AS name                 ,
  w.description                             AS description          ,
  w.timeSlotTemporalDurationId              AS temporalDurationId

FROM salons               AS w
INNER JOIN locations          AS l            ON w.locationId     = l.id
INNER JOIN geoCities          AS g            ON l.geoCityId      = g.id
INNER JOIN geoCountries       AS gc           ON g.geoCountryId   = gc.id
INNER JOIN companies          AS c            ON w.companyId      = c.id

WHERE c.id = ?
