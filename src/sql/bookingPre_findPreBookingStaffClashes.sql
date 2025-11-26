SELECT
  s.id AS staffId

FROM       bookingPre                             AS bp
INNER JOIN staff                                  AS s                    ON bp.staffId                     = s.id
INNER JOIN salonTimeSlot                      AS wt_start             ON bp.startSalonTimeSlotId    = wt_start.id
INNER JOIN salonTimeSlot                      AS wt_end               ON bp.endSalonTimeSlotId      = wt_end.id

WHERE
      bp.startDateYear                          = ?
  AND bp.startDateMonth                         = ?
  AND bp.startDateMonthDay                      = ?
  AND bp.validUntilTimestampSeconds             > UNIX_TIMESTAMP()
  AND s.id                                      = ?
  AND wt_start.salonTimeSlotSequenceNumber  < ?
  AND wt_end.salonTimeSlotSequenceNumber    > ?

LIMIT 1