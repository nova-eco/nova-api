SELECT
  s.id AS staffId

FROM        services                       AS cp
INNER JOIN  serviceLead                    AS cpl  ON cp.id        = cpl.serviceId
INNER JOIN  staff                          AS s    ON cpl.staffId  = s.id

WHERE cp.id = ?

LIMIT 1