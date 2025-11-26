SELECT
  s.id AS staffId

FROM        salons                AS wp
INNER JOIN  salonStaff            AS ws  ON wp.id      = ws.salonId
INNER JOIN  staff                 AS s   ON ws.staffId = s.id

WHERE
      wp.id = ?
  AND s.id  = ?