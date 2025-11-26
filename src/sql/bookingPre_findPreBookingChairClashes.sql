SELECT
  bp.id AS bookingPreId

FROM       bookingPre                             AS bp
INNER JOIN seats                        AS wc                   ON bp.seatId            = wc.id
INNER JOIN salonTimeSlot                      AS wt_start             ON bp.startSalonTimeSlotId    = wt_start.id
INNER JOIN salonTimeSlot                      AS wt_end               ON bp.endSalonTimeSlotId      = wt_end.id

WHERE
      bp.startDateYear                          = ?
  AND bp.startDateMonth                         = ?
  AND bp.startDateMonthDay                      = ?
  AND bp.validUntilTimestampSeconds             > UNIX_TIMESTAMP()
  AND wc.id                                     = ?
  AND wt_start.salonTimeSlotSequenceNumber  < ?
  AND wt_end.salonTimeSlotSequenceNumber    > ?

LIMIT 1