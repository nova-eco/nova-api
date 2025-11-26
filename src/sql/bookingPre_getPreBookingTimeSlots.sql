SELECT
  bp.id                                      AS id                                    ,
  wp.id                                      AS salonId                           ,
  wc.id                                      AS seatId                      ,
  s.id                                       AS staffId                               ,
  bp.serviceId                        AS serviceId                      ,
  wt_start.salonTimeSlotSequenceNumber   AS startSequenceNumber                   ,
  wt_end.salonTimeSlotSequenceNumber     AS endSequenceNumber

FROM        bookingPre                       AS bp
INNER JOIN  staff                            AS s                   ON bp.staffId                     = s.id
INNER JOIN  seats                  AS wc                  ON bp.seatId            = wc.id
INNER JOIN  salons                       AS wp                  ON wc.salonId                 = wp.id
INNER JOIN  salonTimeSlot                As wt_start            ON bp.startSalonTimeSlotId    = wt_start.id
INNER JOIN  salonTimeSlot                As wt_end              ON bp.endSalonTimeSlotId      = wt_end.id

WHERE
      bp.serviceId                    = ?
  AND bp.staffId                             = ?
  AND bp.startDateYear                       = ?
  AND bp.startDateMonth                      = ?
  AND bp.startDateMonthDay                   = ?
  AND bp.validUntilTimestampSeconds          > UNIX_TIMESTAMP()
  AND wp.id                                  = ?