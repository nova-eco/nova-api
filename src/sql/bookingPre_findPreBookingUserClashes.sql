SELECT
  u.id AS userId

FROM       bookingPre                             AS bp
INNER JOIN users                                  AS u                    ON bp.userId                      = u.id
INNER JOIN salonTimeSlot                      AS wt_start             ON bp.startSalonTimeSlotId    = wt_start.id
INNER JOIN salonTimeSlot                      AS wt_end               ON bp.endSalonTimeSlotId      = wt_end.id

WHERE
      bp.startDateYear                          = ?
  AND bp.startDateMonth                         = ?
  AND bp.startDateMonthDay                      = ?
  AND bp.validUntilTimestampSeconds             > UNIX_TIMESTAMP()
  AND u.id                                      = ?
  AND wt_start.salonTimeSlotSequenceNumber  < ?
  AND wt_end.salonTimeSlotSequenceNumber    > ?

LIMIT 1