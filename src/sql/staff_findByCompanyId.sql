SELECT
  s.id                      AS id           ,
  s.companyStaffRoleId      AS staffRoleId  ,
  u.forename                AS forename     ,
  u.surname                 AS surname      ,
  u.username                AS username     ,
  ue.email                  AS email

FROM accounts             AS a
INNER JOIN users          AS u            ON a.userId       = u.id
INNER JOIN companies      AS c            ON a.companyId    = c.id
INNER JOIN userEmails     AS ue           ON u.id           = ue.userId
INNER JOIN staff          AS s            ON s.accountId    = a.id

WHERE a.companyId = ?