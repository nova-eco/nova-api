SELECT
  wp.id                                     AS salonId                            ,
  s.id                                      AS staffId                                ,
  wc.id                                     AS seatId                                ,
  cp.id                                     AS haircutId                              ,
  d.durationMins                            AS haircutDurationMins                    ,
  wpts.salonTimeSlotSequenceNumber      AS salonTimeSlotSequenceNumber        ,
  ?                                         AS startDateYear                          ,
  ?                                         AS startDateMonth                         ,
  ?                                         AS startDateMonthDay                      ,
  ts.twentyFourHourStartValue               AS startHour                              ,
  ts.minuteStartValue                       AS startMin

FROM        salons                      AS wp
INNER JOIN  salonStaff                  AS ws                 ON wp.id                  = ws.salonId
INNER JOIN  staff                           AS s                  ON ws.staffId             = s.id
INNER JOIN  seats                 AS wc                 ON wp.id                  = wc.salonId
INNER JOIN  chairServices   AS wccp               ON wc.id                  = wccp.seatId
INNER JOIN  services                 AS cp                 ON wccp.serviceId  = cp.id
INNER JOIN  salonTimeSlot               AS wpts               ON wp.id                  = wpts.salonId
INNER JOIN  timeSlots                       AS ts                 ON wpts.timeSlotId        = ts.id

INNER JOIN (
  SELECT
    cpp.serviceId                    AS serviceId   ,
    SUM(td.durationMins)                    AS durationMins       ,
    COUNT(cpp.id)                           AS numPeriods

  FROM servicePeriods                AS cpp
  INNER JOIN temporalDurations              AS td                 ON cpp.temporalDurationId = td.id
  GROUP BY cpp.serviceId
) AS d ON cp.id = d.serviceId

LEFT JOIN  serviceLead               AS cpl                ON cp.id = cpl.serviceId

WHERE cp.id = ?
  AND s.id  = ?
  AND wp.id = ?
  AND (cpl.id IS NULL OR cpl.staffId = s.id)

ORDER BY startHour ASC, startMin ASC, seatId ASC