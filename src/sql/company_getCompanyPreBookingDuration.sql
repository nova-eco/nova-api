SELECT
  c.id                                            AS companyId                  ,
  td.durationMins                                 AS durationMins

FROM        companies                             AS c
INNER JOIN  companyPreBookingDurations            AS cd         ON c.id                                 = cd.companyId
INNER JOIN  organisationPreBookingDurations       AS od         ON cd.organisationPreBookingDurationId  = od.id
INNER JOIN  temporalDurations                     AS td         ON od.temporalDurationId                = td.id

WHERE
      c.id                                      = ?
  AND   cd.isEnabled                              = 1

LIMIT 1