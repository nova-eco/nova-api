SELECT s.id AS staffId, s.companyStaffRoleId, s.accountId,
       a.companyId, a.userId,
       u.username, u.forename, u.surname
FROM staff AS s
INNER JOIN accounts AS a ON s.accountId = a.id
INNER JOIN users AS u ON a.userId = u.id
WHERE s.id = ?
LIMIT 1