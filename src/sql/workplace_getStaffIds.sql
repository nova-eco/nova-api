SELECT DISTINCT ws.staffId    AS id

FROM  workplaces              AS wp
INNER JOIN workplaceStaff     AS ws           ON wp.id = ws.workplaceId

WHERE ws.staffId IS NOT NULL AND wp.id = ?