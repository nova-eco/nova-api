SELECT r.*
FROM registrations AS r
INNER JOIN registrationRegistrants AS rr ON r.id = rr.registrationId
WHERE r.isEnabled = 1 AND r.validUntil >= ? AND rr.email = ?
LIMIT 1