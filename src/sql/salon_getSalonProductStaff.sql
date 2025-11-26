SELECT DISTINCT
  wp.id                                         AS salonId        ,
  cp.id                                         AS haircutId          ,
  s.id                                          AS staffId

FROM       salons                           AS wp
INNER JOIN salonStaff                       AS ws                 ON wp.id = ws.salonId
INNER JOIN staff                                AS s                  ON ws.staffId = s.id
INNER JOIN seats                      AS wc                 ON wp.id = wc.salonId
INNER JOIN seats                               AS c                  ON wc.seatId = c.id
INNER JOIN chairServices        AS wccp               ON wc.id = wccp.seatId
INNER JOIN services                      AS cp                 ON wccp.serviceId = cp.id
INNER JOIN products                             AS p                  ON cp.productId = p.id

INNER JOIN (
  SELECT
    cpp.serviceId                        AS serviceId   ,
    SUM(td.durationMins)                        AS durationMins       ,
    COUNT(cpp.id)                               AS numPeriods
  FROM        servicePeriods             AS cpp
  INNER JOIN  temporalDurations                 AS td                 ON cpp.temporalDurationId = td.id
  GROUP BY    cpp.serviceId
) AS d ON cp.id = d.serviceId

LEFT JOIN  serviceLead                   AS cpl                ON cp.id = cpl.serviceId

WHERE
      wp.id = ?
  AND   cp.id = ?
  AND   (cpl.id IS NULL OR cpl.staffId = s.id)