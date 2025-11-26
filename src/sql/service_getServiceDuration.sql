SELECT
  cpp.serviceId                            AS serviceId               ,
  SUM(td.durationMins)                            AS durationMins                   ,
  COUNT(cpp.id)                                   AS numPeriods

FROM        services                       AS cp
INNER JOIN  servicePeriods                 AS cpp                  ON cp.id                  = cpp.serviceId
INNER JOIN  temporalDurations                     AS td                   ON cpp.temporalDurationId = td.id

WHERE       cp.id = ?

GROUP BY    cp.id