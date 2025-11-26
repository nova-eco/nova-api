SELECT
  bp.id                                           AS id                         ,
  bp.serviceId                             AS serviceId           ,
  bp.staffId                                      AS staffId                    ,
  bp.userId                                       AS userId                     ,
  bp.salonId                                  AS salonId                ,
  bp.seatId                             AS seatId           ,
  bp.startDateMonth                               AS startDateMonth             ,
  bp.startDateMonthDay                            AS startDateMonthDay          ,
  bp.startDateYear                                AS startDateYear              ,
  bp.validUntilTimestampSeconds                   AS validUntilTimestampSeconds

FROM        bookingPre                            AS bp
INNER JOIN  services                       AS cp   ON bp.serviceId  = cp.id
INNER JOIN  companies                             AS c    ON cp.companyId         = c.id
INNER JOIN  salons                            AS wp   ON bp.salonId       = wp.id
                                                              AND c.id                = wp.companyId

WHERE  bp.validUntilTimestampSeconds              > UNIX_TIMESTAMP()
AND    c.id                                       = ?