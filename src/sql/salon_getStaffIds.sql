SELECT DISTINCT ws.staffId    AS id

FROM  salons              AS wp
INNER JOIN salonStaff     AS ws           ON wp.id = ws.salonId

WHERE ws.staffId IS NOT NULL AND wp.id = ?
