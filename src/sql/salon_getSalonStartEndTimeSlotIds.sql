SELECT
  wp.id                                           AS salonId                ,
  wts_start.id                                    AS startSalonTimeSlotId   ,
  wts_end.id                                      AS endSalonTimeSlotId

FROM        salons                            AS wp
INNER JOIN  salonTimeSlot                     AS wts_start          ON wp.id  = wts_start.salonId
INNER JOIN  salonTimeSlot                     AS wts_end            ON wp.id  = wts_end.salonId

WHERE
      wp.id                                     = ?
  AND   wts_start.salonTimeSlotSequenceNumber = ?
  AND   wts_end.salonTimeSlotSequenceNumber   = ?

LIMIT 1