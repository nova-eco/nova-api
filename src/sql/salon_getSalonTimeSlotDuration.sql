SELECT
  wp.id                                           AS salonId      ,
  td.durationMins                                 AS durationMins

FROM        salons                            AS wp
INNER JOIN  temporalDurations                     AS td               ON wp.timeSlotTemporalDurationId  = td.id

WHERE       wp.id = ?

LIMIT 1