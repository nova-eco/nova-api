SELECT DISTINCT
  wo.id                             AS id                           ,
  wp.id                             AS workplaceId                  ,
  o.id                              AS openHourId                   ,
  o.openHourTypeId                  AS openHourTypeId               ,
  wo.dayIndexValue                  AS dayIndexValue                ,
  o.twentyFourHourValue             AS twentyFourHourValue          ,
  o.minuteValue                     AS minuteValue

FROM  companies                     AS c
INNER JOIN workplaces               AS wp     ON c.id = wp.companyId
INNER JOIN workplaceOpenHours       AS wo     ON wp.id = wo.workplaceId
INNER JOIN openHours                AS o      ON wo.openHourId = o.id

WHERE c.id = ?