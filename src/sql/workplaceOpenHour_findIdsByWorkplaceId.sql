SELECT DISTINCT wo.id             AS id

FROM  workplaces                  AS wp
INNER JOIN workplaceOpenHours     AS wo     ON wp.id = wo.workplaceId
INNER JOIN openHours              AS o      ON wo.openHourId = o.id

WHERE wo.openHourId IS NOT NULL
AND wp.id = ?