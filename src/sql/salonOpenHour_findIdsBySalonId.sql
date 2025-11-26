SELECT DISTINCT wo.id             AS id

FROM  salons                  AS wp
INNER JOIN salonOpenHours     AS wo     ON wp.id = wo.salonId
INNER JOIN openHours              AS o      ON wo.openHourId = o.id

WHERE wo.openHourId IS NOT NULL
AND wp.id = ?